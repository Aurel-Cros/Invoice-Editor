// Gather and format client informations, then store them in a new Facture object
document
	.getElementById("send")
	.addEventListener("click", function ()
	{
		let infosClient = document.getElementsByName('inputClient')[0].value
		let clientHtml = infosClient.replace(/\n/g, '<br />\n')
		document.getElementById('client').innerHTML = '<p>' + clientHtml + '</p>'

		let documentType = document.getElementById("documentType").value.toUpperCase() // Uppercase document type to use as title
		document.getElementById('docuType').innerHTML = documentType

		let outputDate = dateFormat(document.getElementById("docDate").value) // Format the date to dd-mm-yyyy
		document.getElementById('docuDate').innerHTML = 'Le ' + outputDate

		let documentNumber = ` #${outputDate.slice(-4)}-${document.getElementById("docNumber").value}` // First document of the year 2022 would be '#2022-1'
		document.getElementById('docuNumber').innerHTML = documentNumber

		// Once informations have been processed, create Facture object and enable the form to add items onto the document
		FactureActuelle = new Facture(documentType, documentNumber, outputDate, infosClient)
		document.getElementById('addLine').removeAttribute('disabled')
	});

//Items section
let totalPrice = 0
const itemsListElement = document.getElementsByTagName('tbody')[0]

// Add item on the document
document
	.getElementById('addLine')
	.addEventListener('click', function ()
	{
		const itemToAdd = new Item

		let itemInfos = document.getElementsByName("addItem");

		itemToAdd.name = itemInfos[0].value
		itemToAdd.description = itemInfos[1].value
		itemToAdd.quantity = itemInfos[2].value
		itemToAdd.date = dateFormat(itemInfos[3].value)
		let itemPrice = itemInfos[4].value
		let itemTax = itemInfos[5].value / 100
		let itemTaxInc = itemInfos[6].checked

		if (itemTaxInc)
			itemToAdd.uPriceHT = Math.round((itemPrice / (1 + itemTax)) * 100) / 100
		else
			itemToAdd.uPriceHT = itemPrice;
		
		let newItemElement = document.createElement("tr");
		newItemElement.innerHTML = `<td class="itemDescription">
			<p>${itemToAdd.name}<br />
				<span class="descriptionItem">${itemToAdd.date}<br />
				${itemToAdd.description}<br />
				Prix u : ${itemToAdd.uPriceHT}</span>
			</p></td>
			<td>${itemToAdd.quantity}</td>
			<td>${itemToAdd.uPriceHT * itemToAdd.quantity}</td>`

		itemsListElement.appendChild(newItemElement);
		totalPrice += parseInt(itemToAdd.uPriceHT * itemToAdd.quantity * 100)

		document
			.getElementById('HTtoTTC')
			.innerHTML = Math.round((totalPrice / 100 * 0.22 + Number.EPSILON) * 100) / 100 + ' €'
		document
			.getElementById('totTTC')
			.innerHTML = Math.round((totalPrice / 100 * 1.22 + Number.EPSILON) * 100) / 100 + ' €'

		// Add item to document
		FactureActuelle.addItem(itemToAdd);
	});

// Export html document in its current state
document
	.getElementById('exportDocument')
	.addEventListener('click', function ()
	{
		let facture = document.getElementsByTagName('aside')[0].innerHTML
		let exportDocument = `<!DOCTYPE html>
		<html style="display: flex;flex-flow:row nowrap;justify-content:center;">
			<head>
			<link rel="stylesheet" href="../all.css" />
			</head>
			<body id="exportedDocument">
			${facture}
			</body>
		</html>`;

		let mimeType = 'text/html'

		let link = document.getElementById('exportDocument')
		link.setAttribute('download', `${FactureActuelle.docType}${FactureActuelle.docNumber}.html`)
		link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(exportDocument))
	});

// Export JSON file with document
document
	.getElementById('exportAsJSON')
	.addEventListener('click', function ()
	{
		// Export Facture object as JSON
		let documentJSON = JSON.stringify(FactureActuelle)
		let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(documentJSON)

		let exportFileDefaultName = `${FactureActuelle.docType}${FactureActuelle.docNumber}.json`

		let linkElement = document.getElementById('exportAsJSON')
		linkElement.setAttribute('href', dataUri)
		linkElement.setAttribute('download', exportFileDefaultName)
	});

/* Import JSON file as new document
// WIP
document
	.getElementById('importJSON')
	.addEventListener("change", function (e)
	{
		fileImport = new FileReader()
		fileImport.onload = event => JSON.parse(event.target.result)
		fileImport.readAsText(e.target.files[0])
	})

	*/