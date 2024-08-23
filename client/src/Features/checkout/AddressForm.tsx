import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";
import AppTextInput from "../../App/component/AppTextInput";
import AppCheckBox from "../../App/component/AppCkeckBox";
export default function AddressForm() {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="fullName" label="Full Name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="address1" label="Address1" />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="address2" label="Address2" />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="state" label="state" />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="zip" label="Zip" />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="country" label="Country" />
        </Grid>
        <AppCheckBox
          name="savAddress"
          label="save this as a default address"
          control={control}
        />
      </Grid>
    </>
  );
}
