// Fonction pour gérer l'impression d'une facture
const handlePrint = (item) => {
	// Détermine le statut de paiement
	const paymentStatus = item.prix_restant === "0" ? "Payé" : "Non payé";
	// Récupère la date de la première transaction
	const transactionDate = item.produits.length > 0 ? new Date(item.produits[0].date).toLocaleDateString() : "N/A";
	// URL du logo
	const logoURL = "/logo.png";
	const qrCodeURL = "/qrcode.png";

	// Contenu HTML à imprimer
	const printContent = `
		<html>
			<head>
				<title>Transaction</title>
				<style>
					/* Styles généraux */
					body {
						margin: 20px 15px;
					}
					/* Style de l'en-tête */
					.header {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						margin-bottom: -15px;
					}
					.header img {
						max-height: 50px;
					}
					.header .qr-code {
						max-height: 70px;
					}
					/* Styles du tableau */
					table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 15px;
					}
					/* Style des paragraphes */
					p {
						text-align: justify;
						font-size: 11px;
						line-height: 8px;
					}
					h3{
						text-align: center;
						font-size: 15px;
						margin-top: 20px;
						font-weight: 400;
						font-style: italic;
					}
					/* Styles des cellules du tableau */
					th, td {
						border: 1px dashed #5555;
						text-align: left;
						padding: 10px 8px;
						font-size: 12px;
					}
					th {
						background-color: #f9f9f985;
					}
					tfoot{
						font-weight: bold;
					}
				</style>
			</head>
			<body>
				<!-- En-tête avec logo et numéro de transaction -->
				<div class="header">
					<img src="${logoURL}" alt="Logo de l'entreprise">
					<img class="qr-code" src="${qrCodeURL}" alt="QR Code">
				</div>
				<p> Nous conacter : +261 34 00 000 00 </p>
				<!-- Informations client et date -->
				<div class="transaction-info">
					<p>Client: ${item.client}</p>
					<p>Date: ${transactionDate}</p>
					<p>Transaction N° ${item.pk}</p>
				</div>
				<!-- Tableau des produits -->
				<table>
					<thead>
						<tr>
							<th>Produit</th>
							<th>Marque</th>
							<th>QU</th>
							<th>QG</th>
							<th>Prix</th>
						</tr>
					</thead>
					<tbody>
						${item.produits
							.map(
								(medicament) => `
								
							<tr>
								<td style="fontsize:12px">${medicament.product}</td>
								<td>${medicament.marque || "N/A"}</td>
								<td>${medicament.qte_uniter_transaction}</td>
								<td>${medicament.qte_gros_transaction}</td>
								<td>${medicament.prix_total}</td>
							</tr>
						`
							)
							.join("")}
					</tbody>
					<!-- Pied de tableau avec totaux -->
					<tfoot>
					${
						item.prix_restant == 0
							? `
						<tr>
							<td>État</td>
							<td>${paymentStatus}</td>
							<td colspan="3">Total : ${item.prix_total} Ar</td>
						</tr>`
							: `
					<tr>
							<td>État</td>
							<td>${paymentStatus}</td>
							<td colspan="2">Total : ${item.prix_total} Ar</td>
							<td colspan="1">Restant : ${item.prix_restant} Ar</td>
						</tr>`
					}		
					</tfoot>
				</table>
				<div>
					<h3>« Merci de votre confiance ${item.client} ! »</h3>
					<p style="font-size: 12px; color: #666; text-align: center; margin-top: -10px;">Nous espérons vous revoir bientôt !</p>
				</div>
			</body>
		</html>
	`;

	// Ouvre une nouvelle fenêtre pour l'impression
	const printWindow = window.open("", "", "height=600,width=400");
	// Écrit le contenu HTML dans la fenêtre
	printWindow.document.write(printContent);
	// Ferme le flux d'écriture
	printWindow.document.close();
	// Lance l'impression
	printWindow.print();
};

export default handlePrint;
