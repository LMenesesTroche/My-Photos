import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import rutaBack from "../../redux/actions/rutaBack";
import { useAuth0 } from "@auth0/auth0-react";

const PayPalButton = (props) => {
  const { totalValue, invoice } = props;
  const { user } = useAuth0();

  const handlePaymentSucces = async (details, data) => {
    try {
      const paymentInfo = {
        payerID: user.sub,
        orderID: data.orderID,
        invoice: invoice,
        amount: totalValue,
        status: "COMPLETED", // PayPal ya ha completado el pago
      };
      console.log("Esto se esta mandando", paymentInfo)
      await axios.post(`${rutaBack}/payments/save-payment`, paymentInfo);
      alert("Pago existoso. Gracias por tu compra!");
    } catch (error) {
      console.error("Error al registrar el pago", error);
      alert(
        "Hubo un problema al registrar el pago. Por favor, contacta soporte."
      );
    }
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: invoice,
              amount: {
                value: totalValue.toString(), // Asegúrate de que sea una cadena
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        try {
          const details = await actions.order.capture();
          handlePaymentSucces(details, data);
        } catch (error) {
          console.error("Error capturando el pago", error);
        }
      }}
      onError={(err) => {
        console.error("Paypal Error", err);
        alert("Error procesando el pago Intente de nuevo.");
      }}
    />
  );
};

export default PayPalButton;
