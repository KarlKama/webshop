import React from 'react'

// SmartId, MobiiliId, Pakiautomaadid, Rahvastikuregister
const Payment = (props) => {
//const Payment = ({cartSum}) => {    <=== Teisiti kirjutades
// "amount": cartSum,
    
    const pay = () => {
        // läbi Everypay keskkonna
        // https://support.every-pay.com/downloads/everypay_apiv4_integration_documentation.pdf


        const paymentURL = process.env.REACT_APP_EVERYPAY_PAYMENT_URL; //"https://igw-demo.every-pay.com/api/v4/payments/oneoff";
        const paymentBody = {
            "api_username": process.env.REACT_APP_EVERYPAY_USERNAME,
            "account_name": "EUR3D1",
            "amount": props.cartSum,
            "order_reference": Math.random() * 9999999,
            "nonce": "a9b7f7e" + new Date() + Math.random() * 9999999,
            "timestamp": new Date(),
            "customer_url": process.env.REACT_APP_EVERYPAY_CUSTOMER_URL
        } // https://karl-11-23.web.app/
        ;
        const paymentHeaders = {
            "Authorization": process.env.REACT_APP_EVERYPAY_AUTHORIZATION, // sellega saab everypay sisselogimise ära teha. Genereeritakse useri ja passwordiga kokku. Pärast Everypay decodeb, et sissepääsu lubada https://stackoverflow.com/questions/34860814/basic-authentication-using-javascript
            //Kuidas ise Authorization genereerida: "Basic " + new Buffer(REACT_APP_EVERYPAY_USERNAME + ":" + REACT_APP_EVERYPAY_PASSWORD).toString("base64")
            "Content-Type": "application/json"
        };

        fetch(paymentURL, {"method": "POST", "body": JSON.stringify(paymentBody), "headers": paymentHeaders})
            .then(res => res.json())
            .then(json => window.location.href = json.payment_link);

    }

    // HTMLs: <Link> <--- alati töötav, koodi käima ei pane
    // JavaScript HOOK: useNavigate() <- rakenduse siseselt, kood ka käima, koodi allaossa
    // JavaScript: window.location.href <- rakenduse väline URL
  
    return (
        <button onClick={pay}>Maksa</button>
    )
}

export default Payment