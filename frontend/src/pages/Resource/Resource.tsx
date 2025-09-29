import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Resource.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/ReduxStore";
import { createLoan, updateLoan, queryLoans } from "../../redux/slices/BookLoanSlice";
import { fetchBooks } from "../../redux/slices/BookSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mapAuthorsToString } from "../../bookInfo";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import BookIcon from "@mui/icons-material/Book";

//  MUI imports
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";


export const ResourcePage: React.FC = () => {
    const { barcode } = useParams<{ barcode: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const bookState = useSelector((state: RootState) => state.books);
    const loanState = useSelector((state: RootState) => state.loan);
    const loggedInUser = useSelector((state: RootState) => state.auth.loggedin);
    const userLibraryCard = useSelector((state: RootState) => state.auth.libraryCard);

    const book = bookState.catalog.find((b) => b.barcode === barcode);

    // scrool to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [book?._id]);


    useEffect(() => {
        if (barcode && !book) {
            dispatch(fetchBooks({ page: 1, limit: 24 }));
        }
    }, [barcode, book, dispatch]);

    useEffect(() => {
        if (book?._id) {
            dispatch(queryLoans({ property: "item", value: book._id }));
        }
    }, [book, dispatch]);

    if (!book) return <p>Loading book details...</p>;

    const patronId = userLibraryCard || loggedInUser?._id;
    const currentUserLoan = loanState.records.find((r) => {
        if (r.status !== "LOANED") return false;
        const partonId = typeof r.parton === "string" ? r.parton : r.parton._id;
        const itemId = typeof r.item === "string" ? r.item : r.item._id;
        return String(partonId) === String(patronId) && String(itemId) === String(book._id);
    });

    const handleCheckout = async () => {
        if (!book._id || !loggedInUser) {
            toast.error("You must be logged in to checkout!");
            return;
        }
        if (!patronId) {
            toast.error("You must have a library card to checkout!");
            return;
        }
        if (currentUserLoan) {
            toast.error("You already have this book checked out!");
            return;
        }

        try {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14);

            await dispatch(
                createLoan({
                    status: "LOANED",
                    loanedDate: new Date(),
                    dueDate,
                    parton: patronId,
                    employeeOut: loggedInUser._id,
                    item: book._id,
                })
            ).unwrap();

            dispatch(queryLoans({ property: "item", value: book._id }));

            toast.success(`Book checked out! Due: ${dueDate.toDateString()}`);
        } catch (err: any) {
            toast.error(`Checkout failed: ${err.message || "Unknown error"}`);
        }
    };

    const handleReturn = async () => {
        if (!currentUserLoan || !loggedInUser) {
            toast.error("Return failed: No active loan or user missing");
            return;
        }

        try {
            await dispatch(
                updateLoan({
                    id: currentUserLoan._id,
                    updates: {
                        status: "AVAILABLE",
                        returnedDate: new Date(),
                        employeeIn: loggedInUser._id,
                    },
                })
            ).unwrap();

            dispatch(queryLoans({ property: "item", value: book._id }));

            toast.success("Book returned successfully!");
        } catch (err: any) {
            toast.error(`Return failed: ${err.message || "Unknown error"}`);
        }
    };

    if (!book || bookState.loadingBooks || loanState.loading) {
        return (
            <Box className="resource-loader" sx={{ p: 3, textAlign: "center" }}>
                <Skeleton variant="rectangular" width={180} height={250} sx={{ borderRadius: 2, mx: "auto" }} />
                <Skeleton variant="text" width="60%" sx={{ mt: 2, mx: "auto" }} />
                <Skeleton variant="text" width="40%" sx={{ mx: "auto" }} />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
                    <BookIcon color="disabled" />
                    <Skeleton variant="rectangular" width={140} height={40} sx={{ borderRadius: 2 }} />
                </Box>
            </Box>
        );
    }

    return (
        <div className="resource-page">
            {/* Book Card */}
            <div className="book-card">
                <img src={book.cover} alt={book.title} className="book-cover" />
                <div className="book-info">
                    <Typography variant="h5" gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <b>Author:</b> {mapAuthorsToString(book)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <b>Genre:</b> {book.genre}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {book.description}
                    </Typography>

                    {/* Checkout / Return Buttons */}
                    <Box className="loan-actions" sx={{ mt: 2 }}>
                        {currentUserLoan ? (
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<AssignmentReturnIcon />}
                                onClick={handleReturn}
                            >
                                Return Book
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ShoppingCartCheckoutIcon />}
                                onClick={handleCheckout}
                                disabled={bookState.loadingBooks}
                            >
                                Checkout Book
                            </Button>
                        )}
                    </Box>
                </div>
            </div>

           
{/* Loan History */}
<div className="loan-history-card">
  <h3>Loan History</h3>
  {loanState.records.length === 0 ? (
    <p>No loan history for this book</p>
  ) : (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
        mt: 2,
      }}
    >
      {loanState.records.map((r) => (
        <Box
          key={r._id}
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          {/* Status Chip */}
          <Box sx={{ mb: 1 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "0.8rem",
                fontWeight: 600,
                backgroundColor:
                  r.status === "LOANED" ? "#ffebee" : "#e8f5e9",
                color: r.status === "LOANED" ? "#c62828" : "#2e7d32",
              }}
            >
              {r.status}
            </span>
          </Box>

          {/* Loan Info */}
          <p>📅 Loaned: {new Date(r.loanedDate).toDateString()}</p>
          <p>⏰ Due: {new Date(r.dueDate).toDateString()}</p>
          {r.returnedDate ? (
            <p>✅ Returned: {new Date(r.returnedDate).toDateString()}</p>
          ) : (
            <p>— Not Returned</p>
          )}
        </Box>
      ))}
    </Box>
  )}
</div>


        </div>
    );
};
