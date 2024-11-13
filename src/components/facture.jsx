export const handlePrint = (item) => {
	const paymentStatus = item.prix_restant === "0" ? "Payé" : "Non payé";
	const transactionDate = item.produits.length > 0 ? new Date(item.produits[0].date).toLocaleDateString() : "N/A";
	const logoURL = "/logo.png";

	const printContent = `
		<html>
			<head>
				<title>Transaction</title>
				<style>
					body {
						font-family: Arial, sans-serif;
						margin: 20px;
					}
					.header {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					.header img {
						max-height: 60px;
					}
					table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 15px;
					}
						p {
						margin-top:12px;
						text-align: justify;
						font-size: 13px;
						line-height: 8px;
						}
					th, td {
						border: 1px solid #dddddd;
						text-align: left;
						padding: 10px 8px;
						font-size: 13px;
					}
					th {
						background-color: #f2f2f2;
					}
					tfoot {
						font-weight: bold;
					}
				</style>
			</head>
			<body>
				<div class="header">
					<img src="${logoURL}" alt="Logo de l'entreprise">
					<h5>Transaction #${item.pk}</h5>
				</div>
				<p>Client: ${item.client}</p>
				<p>Date: ${transactionDate}</p>
				
				<table>
					<thead>
						<tr>
							<th>Produit</th>
							<th>Marque</th>
							<th>Q.U</th>
							<th>Q.G</th>
							<th>Prix (Ar)</th>
						</tr>
					</thead>
					<tbody>
						${item.produits
							.map(
								(medicament) => `
							<tr>
								<td style="fontsize:12px">${medicament.product}</td>
								<td>${medicament.marque_product || "N/A"}</td>
								<td>${medicament.qte_uniter_transaction}</td>
								<td>${medicament.qte_gros_transaction}</td>
								<td>${medicament.prix_total}</td>
							</tr>
						`
							)
							.join("")}
					</tbody>
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
			</body>
		</html>
	`;

	const printWindow = window.open("", "", "height=600,width=400");
	printWindow.document.write(printContent);
	printWindow.document.close();
	printWindow.print();
};
