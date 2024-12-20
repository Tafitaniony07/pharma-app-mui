import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@mui/icons-material";
import { Box, IconButton, TableFooter, TablePagination, TableRow } from "@mui/material";
import PropTypes from "prop-types";

const TablePaginationActions = (props) => {
	// Destructure les props nécessaires pour la pagination
	const { count, page, rowsPerPage, onPageChange } = props;

	// Gestionnaire pour aller à la première page
	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	// Gestionnaire pour aller à la page précédente
	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	// Gestionnaire pour aller à la page suivante
	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	// Gestionnaire pour aller à la dernière page
	// Calcule l'index de la dernière page en divisant le nombre total d'éléments par le nombre d'éléments par page
	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				<FirstPage />
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				<KeyboardArrowLeft />
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				<KeyboardArrowRight />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				<LastPage />
			</IconButton>
		</Box>
	);
};

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const PaginationTable = ({ count, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) => {
	return (
		<TableFooter>
			<TableRow>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					colSpan={12}
					count={count}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
					labelRowsPerPage="Lignes par page"
					labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
				/>
			</TableRow>
		</TableFooter>
	);
};

PaginationTable.propTypes = {
	count: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	handleChangePage: PropTypes.func.isRequired,
	handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default PaginationTable;
