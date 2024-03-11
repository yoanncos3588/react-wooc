import { List, styled } from "@mui/material";

const ListLineItemsStyled = styled(List)(({ theme }) => ({
  "& > .MuiListItem-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    flexWrap: "wrap",
    [theme.breakpoints.up("md")]: { flexDirection: "row" },
    "&:last-child": {
      borderBottom: 0,
    },
    "& > .ListLineItemsStyled__link": {
      alignItems: "flex-start",
      display: "flex",
      flexGrow: 1,
      flexBasis: "calc(100% - 56px)",
      [theme.breakpoints.up("md")]: { flexBasis: "calc(100% - 400px)" },
      "& > a": {
        color: "white",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
    "& > .MuiStack-root": {
      flex: "0 0 100%",
      marginTop: theme.spacing(3),
      justifyContent: "flex-end",
      [theme.breakpoints.up("md")]: { flex: "0 0 300px", marginTop: 0 },
      "& > .ListLineItemsStyled__qty": {
        minWidth: "96px",
      },
      "& > .ListLineItemsStyled__delete, & > .ListLineItemsStyled__price": {
        display: "flex",
        alignItems: "center",
      },
      "& > .ListLineItemsStyled__price": {
        "& > .MuiTypography-root": {
          fontWeight: "700",
        },
      },
    },
  },
}));

export default ListLineItemsStyled;
