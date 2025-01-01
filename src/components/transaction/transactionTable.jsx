import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";

const TransactionTable = ({ data }) => {
	return (
		<>
			<TableContainer sx={{ mt: 2, overflow: "hidden", borderRadius: 3 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nom Medicament</TableCell>
							<TableCell>Marque</TableCell>
							<TableCell>Quantité (unitaire)</TableCell>
							<TableCell>Quantité (gros)</TableCell>
							<TableCell>Prix (Ar)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.produits.map((medicament, index) => (
							<TableRow key={index}>
								<TableCell>{medicament.product}</TableCell>
								<TableCell>{medicament.marque}</TableCell>
								<TableCell>{medicament.qte_uniter_transaction}</TableCell>
								<TableCell>{medicament.qte_gros_transaction}</TableCell>
								<TableCell>{medicament.prix_total}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

TransactionTable.propTypes = {
	data: PropTypes.shape({
		produits: PropTypes.arrayOf(
			PropTypes.shape({
				product: PropTypes.string.isRequired,
				marque: PropTypes.string.isRequired,
				qte_uniter_transaction: PropTypes.number.isRequired,
				qte_gros_transaction: PropTypes.number.isRequired,
				prix_total: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};

export default TransactionTable;
