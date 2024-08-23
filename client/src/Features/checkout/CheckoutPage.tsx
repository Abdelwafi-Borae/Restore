// import * as React from "react";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Stepper from "@mui/material/Stepper";
// import Typography from "@mui/material/Typography";
// import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import AddressForm from "./AddressForm";
// // import getCheckoutTheme from "./getCheckoutTheme";
// // import Info from "./Info";
// // import InfoMobile from "./InfoMobile";
// import PaymentForm from "./PaymentForm";
// import Review from "./Review";
// // import ToggleColorMode from "./ToggleColorMode";
// const steps = ["Shipping address", "Payment details", "Review your order"];

// function getStepContent(step: number) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error("Unknown step");
//   }
// }

// export default function CheckoutPage() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   return (
//     <>
//       <CssBaseline />
//       <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
//         <Stepper
//           id="desktop-stepper"
//           activeStep={activeStep}
//           sx={{
//             width: "100%",
//             height: 40,
//           }}
//         >
//           {steps.map((label) => (
//             <Step
//               sx={{
//                 ":first-child": { pl: 0 },
//                 ":last-child": { pr: 0 },
//               }}
//               key={label}
//             >
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         {/* </Box> */}
//         {/* </Box> */}
//         <Card
//           sx={{
//             display: { xs: "flex", md: "none" },
//             width: "100%",
//           }}
//         >
//           <CardContent
//             sx={{
//               display: "flex",
//               width: "100%",
//               alignItems: "center",
//               justifyContent: "space-between",
//               ":last-child": { pb: 2 },
//             }}
//           >
//             <div>
//               <Typography variant="subtitle2" gutterBottom>
//                 Selected products
//               </Typography>
//               <Typography variant="body1">
//                 {activeStep >= 2 ? "$144.97" : "$134.98"}
//               </Typography>
//             </div>
//             {/* <InfoMobile
//                 totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
//               /> */}
//           </CardContent>
//         </Card>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             flexGrow: 1,
//             width: "100%",
//             maxWidth: { sm: "100%", md: 600 },
//             maxHeight: "720px",
//             gap: { xs: 5, md: "none" },
//           }}
//         >
//           <Stepper
//             id="mobile-stepper"
//             activeStep={activeStep}
//             alternativeLabel
//             sx={{ display: { sm: "flex", md: "none" } }}
//           >
//             {steps.map((label) => (
//               <Step
//                 sx={{
//                   ":first-child": { pl: 0 },
//                   ":last-child": { pr: 0 },
//                   "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
//                 }}
//                 key={label}
//               >
//                 <StepLabel
//                   sx={{
//                     ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
//                   }}
//                 >
//                   {label}
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           {activeStep === steps.length ? (
//             <Stack spacing={2} useFlexGap>
//               <Typography variant="h1">📦</Typography>
//               <Typography variant="h5">Thank you for your order!</Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Your order number is
//                 <strong>&nbsp;#140396</strong>. We have emailed your order
//                 confirmation and will update you once its shipped.
//               </Typography>
//               <Button
//                 variant="contained"
//                 sx={{
//                   alignSelf: "start",
//                   width: { xs: "100%", sm: "auto" },
//                 }}
//               >
//                 Go to my orders
//               </Button>
//             </Stack>
//           ) : (
//             <React.Fragment>
//               {getStepContent(activeStep)}
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column-reverse", sm: "row" },
//                   justifyContent:
//                     activeStep !== 0 ? "space-between" : "flex-end",
//                   alignItems: "end",
//                   flexGrow: 1,
//                   gap: 1,
//                   pb: { xs: 12, sm: 0 },
//                   mt: { xs: 2, sm: 0 },
//                   mb: "60px",
//                 }}
//               >
//                 {activeStep !== 0 && (
//                   <Button
//                     startIcon={<ChevronLeftRoundedIcon />}
//                     onClick={handleBack}
//                     variant="text"
//                     sx={{
//                       display: { xs: "none", sm: "flex" },
//                     }}
//                   >
//                     Previous
//                   </Button>
//                 )}
//                 {activeStep !== 0 && (
//                   <Button
//                     startIcon={<ChevronLeftRoundedIcon />}
//                     onClick={handleBack}
//                     variant="outlined"
//                     fullWidth
//                     sx={{
//                       display: { xs: "flex", sm: "none" },
//                     }}
//                   >
//                     Previous
//                   </Button>
//                 )}
//                 <Button
//                   variant="contained"
//                   endIcon={<ChevronRightRoundedIcon />}
//                   onClick={handleNext}
//                   sx={{
//                     width: { xs: "100%", sm: "fit-content" },
//                   }}
//                 >
//                   {activeStep === steps.length - 1 ? "Place order" : "Next"}
//                 </Button>
//               </Box>
//             </React.Fragment>
//           )}
//         </Box>
//       </Grid>
//       {/*  </Grid> */}
//     </>
//   );
// }
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useForm, FieldValues, FormProvider } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validationscema } from "./Checkoutvalidation";
import { useappdispatch } from "../../App/store/configureStore";
import agent from "../../App/API/agent";
import { clearbasket } from "../Basket/Bsketslice";
const steps = ["Shipping address", "Review your order", "Payment details"];
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error("Unknown step");
  }
}
export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const currentvalidation = Validationscema[activeStep];
  const [ordernumber, setordernumber] = useState(0);
  const [loading, setloading] = useState(false);
  const dispatch = useappdispatch();
  const method = useForm({
    mode: "all",
    resolver: yupResolver(currentvalidation),
  });
  useEffect(() => {
    agent.Account.getuseraddress().then((response) => {
      if (response) {
        method.reset({ ...method.getValues(), ...response, savAddress: false });
      }
    });
  }, [method]);
  const handleNext = async (data: FieldValues) => {
    const { nameOnCard, savAddress, ...shippingAdress } = data;
    if (activeStep === steps.length - 1) {
      setloading(true);
      try {
        const ordernumber = await agent.order.createorder({
          savAddress,
          shippingAdress,
        });
        setordernumber(ordernumber);
        setActiveStep(activeStep + 1);
        dispatch(clearbasket());
        setloading(false);
      } catch (er) {
        console.log(er);
        setloading(false);
      }
      console.log(data);
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <FormProvider {...method}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                THANK YOU FOR YOUR ORDER
              </Typography>
              <Typography variant="subtitle1">
                Your order number is {ordernumber} . We have not emailed your
                order confirmation, and will not send you an update when your
                order has shipped as this is a fake store!
              </Typography>
            </>
          ) : (
            <>
              <form onSubmit={method.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <LoadingButton
                    loading={loading}
                    disabled={!method.formState.isValid}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </LoadingButton>
                </Box>
              </form>
            </>
          )}
        </>
      </Paper>
    </FormProvider>
  );
}
