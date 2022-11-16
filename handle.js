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
	})

//Items section
let totalPrice = 0
const itemsListElement = document.getElementById('tbody')

// Add item on the document
document
	.getElementById('addLine')
	.addEventListener('click', function ()
	{
		const itemToAdd = new Item

		let itemInfos = document.getElementsByName("addItem")

		itemToAdd.name = itemInfos[0].value
		itemToAdd.description = itemInfos[1].value.replace("\n","<br>\n")
		itemToAdd.quantity = itemInfos[2].value
		let itemPrice = itemInfos[3].value
		let itemTax = itemInfos[4].value / 100
		let itemTaxInc = itemInfos[5].checked

		if (itemTaxInc)
			itemToAdd.uPriceHT = Math.round((itemPrice * (1 - itemTax)) * 100) / 100
		else
			itemToAdd.uPriceHT = itemPrice
		
		let newItemElement = document.createElement("tr")
		newItemElement.innerHTML = `<td class="itemDescription">
			<p>${itemToAdd.name}<br />
				<span class="descriptionItem">${descriptionSlot}
				Prix/u TTC : ${itemPrice} €</span>
			</p></div>
			<div class="msmaller center">${itemToAdd.quantity}</div>
			<div class="msmaller center">${itemToAdd.uPriceHT * itemToAdd.quantity} €</div>`

		itemsListElement.appendChild(newItemElement)
		totalPrice += parseInt(itemToAdd.uPriceHT * itemToAdd.quantity * 100)
		let TTCPrice = Math.round((totalPrice / 100 / 0.78 + Number.EPSILON) * 100) / 100
		document
			.getElementById('HTtoTTC')
			.innerHTML = Math.round((TTCPrice * 0.22 + Number.EPSILON) * 100) / 100 + ' €'
		document
			.getElementById('totTTC')
			.innerHTML = TTCPrice + ' €'

		// Add item to document
		FactureActuelle.addItem(itemToAdd)
	})

// Export html document in its current state
document
	.getElementById('exportDocument')
	.addEventListener('click', function ()
	{
		let facture = document.getElementsByTagName('aside')[0].innerHTML
		let exportDocument = `<!DOCTYPE html>
		<html style="display: flexflex-flow:row nowrap;justify-content:center;">
			<head>
			<style type="text/css">*
			{
				margin: 0;
				padding: 0;
			}
			body
			{
				font-family: Arial, Times, 'Times New Roman', serif;
			}
			header
			{
				height: 8%;
				vertical-align: middle;
				margin-top: 20px;
			}
			header, nav, main
			{
				width: 100%;
			}
			nav ul
			{
				width: 100%;
				list-style: inside;
				margin: auto;
				display: flex;
				justify-content: space-evenly;
			}
			nav li:hover
			{
				cursor: pointer;
			}
			footer
			{
				position: relative;
				bottom: 50px;
				text-align: center;
			}
			
			.button
			{
				margin: 5px;
				padding: 6px;
				border-radius: 25px;
				border: 1px dotted black;
				background: rgb(246, 251, 255);
				transition: 0.3s;
			}
			.button:hover
			{
				cursor: pointer;
				background: rgb(235, 246, 255);
			}
			.button:active
			{
				border: inset 1px;
				background: rgb(253, 253, 253);
			}
			
			#docuDate
			{
				font-weight: 100;
				width: 80%;
				margin: auto;
				text-align: start;
			}
			
			.smaller
			{
				font-size: 0.95em;
			}
			.vsmaller
			{
				font-size: 0.75em;
				font-style: italic;
				color: #454545;
			}
			
			aside
			{
				border: 1px solid black;
				border-radius: 5px;
				aspect-ratio: 21/29.7;
				width: 600px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
			}
			#exportedDocument {
				aspect-ratio: 21/29.7;
				width: 20cm;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
			}
			aside p, #exportedDocument p
			{
				padding: 9px;
			}
			
			section
			{
				width: 90%;
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-evenly;
				align-items: center;
				height: 70%;
				margin: 11% auto;
			}
			section div
			{
				width: 45%;
				margin: auto;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
			}
			section h2
			{
				margin: 5% auto;
			}
			section div div
			{
				width: 90%;
			}
			
			#parties
			{
				width: 100%;
				margin: auto;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				font-size: 0.85em;
			}
			#parties div
			{
				width: 49%;
				margin: 0.5%;
			}
			#infosEI
			{
				text-align: end;
			}
			
			#items
			{
				height: 70%;
				width: 100%;
			}
			#items th
			{
				vertical-align: middle;
			}
			#items th, #items td
			{
				text-align: center;
				background-color: rgba(252, 252, 252, 0.5);
				border-radius: 20px;
				padding: 15px;
			}
			tbody
			{
				font-size: 0.88em;
			}
			
			.hide
			{
				visibility: hidden;
			}
			
			.itemLine:hover
			{
				cursor: pointer;
				background: rgba(250,150,150,0.8);
			}
			
			.itemDescription
			{
				text-align: start !important;
			}
			.descriptionItem
			{
				color: #666;
				font-size: 0.8em;
			}
			
			#clauses
			{
				width: 80%;
				color: #444;
				font-size: 0.66em;
			}
			#clauses p
			{
				margin: 5px;
			}
			
			#ouvrir
			{
				display: none;
			}</style>
			</head>
			<body id="exportedDocument">
			${facture}
			</body>
		</html>`

		let mimeType = 'text/html'

		let link = document.getElementById('exportDocument')
		link.setAttribute('download', `${FactureActuelle.docType}${FactureActuelle.docNumber}.html`)
		link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(exportDocument))
	})

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
	})

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