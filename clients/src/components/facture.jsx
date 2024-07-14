export const handlePrint = (item) => {
	const paymentStatus = item.prix_restant === "0" ? "Payé" : "Non payé";
	const transactionDate = item.produits.length > 0 ? new Date(item.produits[0].date).toLocaleDateString() : "N/A";
	const logoURL =
		"https://www.kapilamangilatra.com/wp-content/uploads/2024/01/cropped-Kapila_mangilatra_logo-removebg-preview.png";

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
						max-height: 80px;
					}
					table {
						width: 100%;
						border-collapse: collapse;
						margin-top: 20px;
					}
					th, td {
						border: 1px solid #dddddd;
						text-align: left;
						padding: 10px 8px;
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
					<h1>Transaction #${item.pk}</h1>
				</div>
				<p>Client: ${item.client}</p>
				<p>Date: ${transactionDate}</p>
				<p>Montant total à payer: ${item.prix_total} Ar</p>
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
								<td>${medicament.product}</td>
								<td>${medicament.marque || "N/A"}</td>
								<td>${medicament.qte_uniter_transaction}</td>
								<td>${medicament.qte_gros_transaction}</td>
								<td>${medicament.prix_total}</td>
							</tr>
						`
							)
							.join("")}
					</tbody>
					<tfoot>
						<tr>
							<td>État</td>
							<td>${paymentStatus}</td>
							<td colspan="3">Total : ${item.prix_total} Ar</td>
						</tr>
					</tfoot>
				</table>
			</body>
		</html>
	`;

	const printWindow = window.open("", "", "height=600,width=800");
	printWindow.document.write(printContent);
	printWindow.document.close();
	printWindow.print();
};
