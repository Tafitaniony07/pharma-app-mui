const ListMedicamentsVendeur = () => {
    // États initiaux
    const [filterText, setFilterText] = useState("");
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addCart, setAddCart] = useState([]);
    const [loadingState, setLoadingState] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [units, setUnits] = useState({});
    const [transactions, setTransactions] = useState([]);

    // Données des médicaments
    const Medicaments = [
        { name: "AAMLA gelu /30", quantity: 50, price: 1500, unitPrice: 500 },
        { name: "ABBOTICINE gnl/sp", quantity: 150, price: 15200, unitPrice: 3800 },
        { name: "Paracetamol", quantity: 50, price: 1800, unitPrice: 600 },
        { name: "Parabufen", quantity: 150, price: 2800, unitPrice: 700 },
        { name: "ABUFENE 400mg cpr /30", quantity: 510, price: 18800, unitPrice: 4700 },
    ];

    // Fonction de changement de page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Fonction de changement du nombre de lignes par page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Ajouter un article au panier
    const addToCart = (item) => {
        const unit = units[item.name] || "plaquette";
        const quantity = quantities[item.name] || 1;
        let itemPrice = unit === "boîte" ? item.price : item.unitPrice;
        if (unit === "boîte" && quantity > 4) {
            itemPrice = itemPrice * 0.95; // Appliquer une réduction de 5%
        }
        const cartItem = { ...item, price: itemPrice * quantity, unit, quantity };
        if (addCart.some((cartItem) => cartItem.name === item.name && cartItem.unit === unit)) {
            toast.warning("L'article est déjà ajouté au panier");
            return;
        }
        setLoadingState({ ...loadingState, [item.name]: true });
        setTimeout(() => {
            setAddCart((prev) => [...prev, cartItem]);
            setLoadingState({ ...loadingState, [item.name]: false });
        }, 500);
    };

    // Mettre à jour la quantité dans le panier
    const updateCartQuantity = (name, quantity) => {
        setAddCart((prevCart) =>
            prevCart.map((item) =>
                item.name === name ? { ...item, quantity, price: item.unit === "boîte" ? item.price * quantity : item.unitPrice * quantity } : item
            )
        );
    };

    // Enregistrer une transaction
    const saveTransaction = () => {
        setTransactions((prevTransactions) => [
            ...prevTransactions,
            { date: new Date(), items: [...addCart] }
        ]);
        setAddCart([]);
    };

    const tableTheme = createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        padding: "15px",
                        background: "#4d4373",
                        color: "#fff",
                        fontFamily: "Exo2-Medium",
                        fontSize: "18px",
                    },
                    body: {
                        background: "#fcfffc",
                        padding: "10px",
                    },
                },
            },
        },
    });

    return (
        <>
            <Grid container spacing={3}>
                <ThemeProvider theme={tableTheme}>
                    <Grid item xs={8}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky header">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortColumn === "name"}
                                                direction={sortDirection}
                                                onClick={() => handleSort("name")}
                                            >
                                                Nom
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortColumn === "quantity"}
                                                direction={sortDirection}
                                                onClick={() => handleSort("quantity")}
                                            >
                                                Quantité
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortColumn === "price"}
                                                direction={sortDirection}
                                                onClick={() => handleSort("price")}
                                            >
                                                Prix
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.price} Ar</TableCell>
                                            <TableCell>
                                                <Stack direction="row" gap={2}>
                                                    <Fab
                                                        size="small"
                                                        aria-label="view"
                                                        sx={{
                                                            background: "rgba(58, 0, 128, 0.055)",
                                                            boxShadow: "0",
                                                            border: "0px solid rgba(58, 0, 128, 0.145)",
                                                        }}
                                                        onClick={() => handleView(item)}
                                                    >
                                                        <Visibility />
                                                    </Fab>
                                                    {loadingState[item.name] ? (
                                                        <Fab
                                                            size="small"
                                                            aria-label="loading"
                                                            sx={{
                                                                background: "rgba(0, 128, 0, 1)",
                                                                boxShadow: "0",
                                                                color: "#fff",
                                                                border: "1px solid rgba(0, 128, 0, 0.145)",
                                                            }}
                                                        >
                                                            <CircularProgress size={24} color="inherit" />
                                                        </Fab>
                                                    ) : addCart.some((cartItem) => cartItem.name === item.name && cartItem.unit === units[item.name]) ? (
                                                        <Fab
                                                            size="small"
                                                            aria-label="added"
                                                            sx={{
                                                                background: "rgba(0, 128, 0, 1)",
                                                                boxShadow: "0",
                                                                color: "#fff",
                                                                border: "1px solid rgba(0, 128, 0, 0.145)",
                                                                "&:hover": {
                                                                    color: "rgba(0, 128, 0, 1)",
                                                                    background: "rgba(0, 128, 0, 0.145)",
                                                                },
                                                            }}
                                                        >
                                                            <Check />
                                                        </Fab>
                                                    ) : (
                                                        <>
                                                            <Select
                                                                value={units[item.name] || "plaquette"}
                                                                onChange={(e) => setUnits({ ...units, [item.name]: e.target.value })}
                                                                size="small"
                                                                sx={{ minWidth: 80 }}
                                                            >
                                                                <MenuItem value="plaquette">Plaquette</MenuItem>
                                                                <MenuItem value="boîte">Boîte</MenuItem>
                                                            </Select>
                                                            <TextField
                                                                type="number"
                                                                value={quantities[item.name] || 1}
                                                                onChange={(e) => setQuantities({ ...quantities, [item.name]: e.target.value })}
                                                                size="small"
                                                                sx={{ maxWidth: 80 }}
                                                                inputProps={{ min: 1 }}
                                                            />
                                                            <Fab
                                                                size="small"
                                                                aria-label="add"
                                                                onClick={() => addToCart(item)}
                                                                sx={{
                                                                    background: "rgba(0, 128, 0, 1)",
                                                                    boxShadow: "0",
                                                                    color: "#fff",
                                                                    border: "1px solid rgba(0, 128, 0, 0.145)",
                                                                    "&:hover": {
                                                                        color: "rgba(0, 128, 0, 1)",
                                                                        background: "rgba(0, 128, 0, 0.145)",
                                                                    },
                                                                }}
                                                            >
                                                                <ShoppingCartOutlined />
                                                            </Fab>
                                                        </>
                                                    )}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            count={sortedData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={4}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                "&.MuiTableCell-root": {
                                                    background: "rgba(0, 128, 0, 1)",
                                                    fontFamily: "Exo2-Medium",
                                                    fontSize: "18px",
                                                },
                                            }}
                                        >
                                            Item
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                "&.MuiTableCell-root": {
                                                    background: "rgba(0, 128, 0, 1)",
                                                },
                                            }}
                                        >
                                            Unité
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                "&.MuiTableCell-root": {
                                                    background: "rgba(0, 128, 0, 1)",
                                                },
                                            }}
                                        >
                                            Quantité
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                "&.MuiTableCell-root": {
                                                    background: "rgba(0, 128, 0, 1)",
                                                },
                                            }}
                                        >
                                            Prix
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {addCart.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateCartQuantity(item.name, e.target.value)}
                                                    size="small"
                                                    inputProps={{ min: 1 }}
                                                />
                                            </TableCell>
                                            <TableCell>{item.price} Ar</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                fontFamily: "Exo2-Medium",
                                                color: "#000",
                                                fontSize: "18px",
                                            }}
                                            colSpan={3}
                                        >
                                            Total :
                                        </TableCell>
                                        <TableCell>{addCart.reduce((sum, item) => sum + item.price, 0)} Ar</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={saveTransaction}
                                            >
                                                Passer la commande
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </>
    );
};

export default ListMedicamentsVendeur;
