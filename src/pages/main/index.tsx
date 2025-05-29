import { Container, Alert, Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getVirtualItems } from "../../api/store.ts";
import { VirtualItemType } from "../../api/types.ts";
import { useAuthContext } from "../../contexts/useAuthContext";
import VirtualItemCard from "../../components/VirtualItemCard.tsx";
import { headlessCheckout } from "@xsolla/pay-station-sdk";
import { buildPaymentFlow } from "./sdk-init.ts";

const MainPage = () => {
  const { isAuthorized } = useAuthContext();
  const [virtualItems, setVirtualItems] = useState<VirtualItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getVirtualItems().then((result) => {
      setVirtualItems(result.items);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      await headlessCheckout.init({
        isWebview: false,
        sandbox: false,
      });
      debugger;
      await headlessCheckout.setToken(
        "coqu6XtWh10Ur30U9Ls1SmlGpvkUniqy_lc_en_bg_FFFFFF_tb_3D46F5",
      );

      await headlessCheckout.form.init({
        paymentMethodId: 1380,
        returnUrl: "http://localhost:9000/return-page",
      });

      headlessCheckout.form.onNextAction((nextAction) => {
        switch (nextAction.type) {
          case "check_status": {
            console.log("showStatus =", true);
          }
        }
      });
    };
    init();
    // buildPaymentFlow();
  }, []);

  if (!isAuthorized) {
    return (
      <Container maxWidth="sm" sx={{ paddingTop: "30px" }}>
        <Alert severity="info">
          To see Virtual Items, please log in to your account
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <div className="application">
        <h1>Credit card integration</h1>
        <div className="columns-wrapper">
          <div className="left-col">
            {/*@ts-ignore*/}
            <psdk-finance-details></psdk-finance-details>
            {/*@ts-ignore*/}
            <psdk-total></psdk-total>
          </div>

          <div className="right-col">
            <div id="form-container"></div>

            <div id="status-container"></div>
          </div>
        </div>
        {/*@ts-ignore*/}
        <psdk-legal></psdk-legal>
      </div>
      <Typography variant="h4" align="center" paddingBottom={"30px"}>
        Virtual Items
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {loading ? (
          <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <CircularProgress size={30} color="primary" />
          </Container>
        ) : (
          <Grid container spacing={3}>
            {virtualItems.map((item) => (
              <Grid key={item.item_id} size={3}>
                <VirtualItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    top: "50px",*/}
      {/*    left: "50px",*/}
      {/*    width: "100%",*/}
      {/*    height: "100%",*/}
      {/*    zIndex: 1000,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <iframe*/}
      {/*    src={*/}
      {/*      // "http://localhost:4200/?token=uep0d5suCQVbhbb3Yu9tuxCN78l1sF6Z_lc_en"*/}
      {/*      // "http://localhost:4200/?token=8sogkde49l4x81wQH6isbns7SEtYobm7_lc_en"*/}
      {/*      // "http://localhost:4200/?token=8sogRo2MVxbdOjJztGO0HJgp1nxZC5t8_lc_en"*/}
      {/*      "http://localhost:4200/?token=8sogYSs8R5pL5iZHjWig6Err7uksT6lF_lc_en"*/}
      {/*    }*/}
      {/*    width="900"*/}
      {/*    height="1000"*/}
      {/*    allow="clipboard-read; clipboard-write; payment"*/}
      {/*  ></iframe>*/}
      {/*</div>*/}
    </>
  );
};

export default MainPage;
