import React from 'react';
import //makeStyles,
'@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   box: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginBottom: '5em',
//   },
//   row: {
//     display: 'flex',
//     justifyContent: 'center',
//     flexShrink: '1',
//     color: '#000000',
//   },
//   marginTop: {
//     marginTop: '1vw',
//   },
//   mr: {
//     marginRight: '1rem',
//   },
//   hr: {
//     border: '0px',
//     width: '100%',
//     background: '#bbbbbb',
//     height: '1px',
//   },
// }));

export const DonationStep = ({
  // handleChangeEvent,
  // handleChangeProps,
  // handleValidation,
  // items: {
  //   firstname,
  //   lastname,
  //   email,
  //   cell,
  //   address1,
  //   address2,
  //   city,
  //   state,
  //   zipcode,
  //   card,
  //   exp,
  //   cvv,
  //   amount,
  //   interval,
  // },
  // donationErrors,
}) => {
  // const classes = useStyles();
  // const form = 'donation';

  // //Cell number to be formatted
  // const [values, setValues] = useState();

  // const [showForm, setShowForm] = useState(false);
  // const [showOneForm, setShowOneForm] = useState(false);
  // const [showRepeatForm, setShowRepeatForm] = useState(false);

  //   const useScript = url => {
  //   useEffect(() => {
  //     const script = document.createElement('script');
  //     script.src = url;
  //     script.async = true;
  //     document.body.appendChild(script);
  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, [url]);
  // };

  // useScript('https://secure.givelively.org/donate/alerts-for-good?ref=sd_widget');

  // const onClick = () => {
  //   setShowOneForm(true);
  //   setShowForm(true);
  // };

  // const onRepeatClick = () => {
  //   setShowRepeatForm(true);
  //   setShowForm(true);
  // };

  // //cell event handler
  // const handleCellChange = (form, event) => {
  //   const e = event;
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   const field = name;
  //   //prettier-ignore
  //   //console.log(`handleCellChange name: `,name,` value: `,value,`form: `,form);
  //   setValues(value);
  //   //update parent state with changed cell
  //   handleChangeProps({ field, value, form });
  //   handleFieldValidation(form, e);
  // };

  // const handleFieldValidation = (form, e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;
  //   //console.log(`handleFieldValidation field: `, field, ` value: `, value);
  //   handleValidation({ field, value, form });
  // };

  // const handleDonationChange = (form, e) => {
  //   let field = e.target.name;
  //   let value = e.target.value;
  //   //console.log(`field: `, field, `value: `, value, `form: `, form);
  //   handleChangeProps({ field, value, form });
  // };

  const GiveLivelyScript = () => {
    const script = document.createElement('script');
    script.src =
      'https://secure.givelively.org/widgets/branded_donation/alerts-for-good.js';
    script.async = true;
    //document.body.appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(script);
    return <script />;
  };

  // const GiveLivelySimpleScript = () => {
  //   const script = document.createElement('script');
  //   script.src = 'https://secure.givelively.org/widgets/simple_donation/alerts-for-good.js?show_suggested_amount_buttons=false&show_in_honor_of=false&address_required=false&has_required_custom_question=null';
  //   script.async = true;
  //   document.getElementsByTagName('head')[0].appendChild(script);
  //   return (<script />);
  // }

  return (
    <div>
      {/* <div>
      <GiveLivelySimpleScript />
      <div
        data-widget-src="https://secure.givelively.org/donate/alerts-for-good?ref=sd_widget"
        id="give-lively-widget"
        className="gl-branded-donation-widget">
      </div>
    </div> */}
      <div>
        <GiveLivelyScript />
        <div
          data-widget-src="https://secure.givelively.org/donate/alerts-for-good?ref=sd_widget"
          id="give-lively-widget"
          className="gl-branded-donation-widget"></div>
      </div>
    </div>
  );
};

//  return (
//   <div>

//   </div>
//   <div>
//     <Box className={classes.box}>
//       {/* begin::Header */}
//       <div className={classes.row}>
//         <h3>
//           <span className="card-label font-weight-bolder text-muted">
//             Your donations support Alerts for Good
//           </span>
//         </h3>
//       </div>
//       {!showForm ? (
//         <div>
//           <hr className={classes.hr} />
//           <OneButton
//             showForm={showForm}
//             onClick={onClick}
//             classes={classes}
//           />
//         </div>
//       ) : null}
//       {!showForm ? (
//         <div>
//           <RepeatButton
//             showForm={showForm}
//             onClick={onRepeatClick}
//             classes={classes}
//           />
//         </div>
//       ) : null}

//       {showRepeatForm ? (
//         <>
//           <div className={classes.row}>
//             <div>
//               <hr className={classes.hr} />
//             </div>
//             <Form
//               id="donateForm"
//               className="table-vertical-center"
//               noValidate
//               autoComplete="off">
//               <Box className={classes.row}>
//                 <Form.Check
//                   name="interval"
//                   checked = {interval === 'weekly'}
//                   inline
//                   label="Weekly"
//                   value="weekly"
//                   type="radio"
//                   id={`inline-radio-1`}
//                   onChange={e => {if(e.target.checked) handleDonationChange({ form }, e)}}
//                 />
//                 <Form.Check
//                   name="interval"
//                   checked = {interval === 'monthly'}
//                   inline
//                   label="Monthly"
//                   value="monthly"
//                   type="radio"
//                   id={`inline-radio-2`}
//                    onChange={e => {if(e.target.checked) handleDonationChange({ form }, e)}}
//                 />
//                 <Form.Check
//                   name="interval"
//                   checked = {interval === 'annually'}
//                   inline
//                   label="Annually"
//                   value="annually"
//                   type="radio"
//                   id={`inline-radio-3`}
//                    onChange={e => {if(e.target.checked) handleDonationChange({ form }, e)}}
//                 />
//                 <Form.Group controlId="formSelect">
//                   <Form.Label>&nbsp;&nbsp;&nbsp;Amount</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="amount"
//                     value={amount}
//                     onChange={e => {handleDonationChange({ form }, e)}}>
//                     <option value="1">$1</option>
//                     <option value="2">$2</option>
//                     <option value="5">$5</option>
//                     <option value="10">$10</option>
//                     <option value="20">$20</option>
//                     <option value="50">$50</option>
//                     <option value="100">$100</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Box>
//             </Form>
//           </div>
//           <div className={classes.row}>
//             <hr className={classes.hr} />
//           </div>
//         </>
//       ) : null}

//       {showOneForm ? (
//         <div className={classes.row}>
//           <div className={classes.row}>
//             <hr className={classes.hr} />
//           </div>
//           <Form
//             id="donateOnceForm"
//             className="table-vertical-center"
//             noValidate
//             autoComplete="off">
//             <div className={classes.row}>
//               <Form.Group controlId="formSelect">
//                 <Form.Label>&nbsp;&nbsp;&nbsp;Amount</Form.Label>
//                 <Form.Control
//                   as="select"
//                   name="amount"
//                   value={amount}
//                   onChange={e => {handleDonationChange({ form }, e)}}>
//                   <option value="1">$1</option>
//                   <option value="2">$2</option>
//                   <option value="5">$5</option>
//                   <option value="10">$10</option>
//                   <option value="20">$20</option>
//                   <option value="50">$50</option>
//                   <option value="100">$100</option>
//                 </Form.Control>
//               </Form.Group>
//             </div>
//           </Form>
//         </div>
//       ) : null}
//       {showForm ? (
//         <>
//           <Form
//             id="cardForm"
//             className="table-vertical-center"
//             noValidate
//             autoComplete="off">
//             <div className={classes.row}>
//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="Card number"
//                 error={!!donationErrors.card}
//                 required
//                 name="card"
//                 type="text"
//                 value={card || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.card}
//               />

//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="Exp Date"
//                 error={!!donationErrors.exp}
//                 required
//                 name="exp"
//                 type="text"
//                 value={exp || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.exp}
//               />

//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="cvv"
//                 error={!!donationErrors.cvv}
//                 required
//                 name="cvv"
//                 type="text"
//                 value={cvv || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.cvv}
//               />
//             </div>

//             <div className={classes.row}>
//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="First name"
//                 error={!!donationErrors.firstname}
//                 required
//                 name="firstname"
//                 type="text"
//                 value={firstname || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.firstname}
//               />
//               <TextField
//                 className={clsx(classes.margin, classes.textField)}
//                 label="Last name"
//                 error={!!donationErrors.lastname}
//                 required
//                 name="lastname"
//                 type="text"
//                 value={lastname || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.lastname}
//               />
//             </div>
//             <div className={classes.row}>
//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="Email"
//                 error={!!donationErrors.email}
//                 required
//                 name="email"
//                 type="email"
//                 value={email || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.email}
//               />

//               <TextField
//                 className={clsx(classes.margin, classes.textField)}
//                 id="cell"
//                 label="Cell phone"
//                 error={!!donationErrors.cell}
//                 required
//                 name="cell"
//                 type="tel"
//                 value={cell || ''}
//                 helperText={donationErrors.cell}
//                 onChange={event => handleCellChange({ form }, event)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 InputProps={{
//                   inputComponent: CellNumberFormat,
//                 }}
//               />
//             </div>

//             <div className={classes.row}>
//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="Address 1"
//                 error={!!donationErrors.address1}
//                 required
//                 name="address1"
//                 type="text"
//                 value={address1 || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.address1}
//               />

//               <TextField
//                 className={clsx(classes.margin, classes.textField)}
//                 label="Address 2"
//                 name="address2"
//                 type="text"
//                 value={address2 || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//               />
//             </div>
//             <div className={classes.row}>
//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="City"
//                 error={!!donationErrors.city}
//                 required
//                 name="city"
//                 type="text"
//                 value={city || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.city}
//               />

//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="St"
//                 error={!!donationErrors.state}
//                 required
//                 name="state"
//                 type="text"
//                 value={state || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.state}
//               />

//               <TextField
//                 className={clsx(
//                   classes.margin,
//                   classes.mr,
//                   classes.textField
//                 )}
//                 label="Zip code"
//                 error={!!donationErrors.zipcode}
//                 required
//                 name="zipcode"
//                 type="text"
//                 value={zipcode || ''}
//                 onChange={e => handleChangeEvent(-1, { form }, e)}
//                 onBlur={e => handleFieldValidation({ form }, e)}
//                 helperText={donationErrors.zipcode}
//               />
//             </div>
//           </Form>
//         </>
//       ) : null}
//     </Box>
//   </div>
// );
// };

// const OneButton = ({ showForm, onClick, classes }) => {
//   return (
//     <div className={classes.row}>
//       <span>
//         <span className="card-label font-weight-bold font-size-lg">
//           Make a one-time donation&nbsp;&nbsp;
//         </span>
//         <span className="svg-icon svg-icon-sm svg-icon-white" key="sh1">
//           <Button
//             key="b1"
//             className="btn btn-success font-weight-bolder font-size-sm"
//             style={{ background: '#2cb7e3' }}
//             disabled={showForm}
//             onClick={onClick}>
//             <AttachMoneyIcon className="max-h-70px svg-icon-sm svg-icon-white" />
//           </Button>
//         </span>
//       </span>
//     </div>
//   );
// };

// const RepeatButton = ({ showForm, onClick, classes }) => {
//   return (
//     <div className={(classes.row, classes.marginTop)}>
//       <span>
//         <span className="card-label font-weight-bold font-size-lg">
//           Schedule a recurring donation&nbsp;&nbsp;
//         </span>

//         <span className="svg-icon svg-icon-sm svg-icon-white" key="sh2">
//           <Button
//             key="b2"
//             className="btn btn-success font-weight-bolder font-size-sm"
//             disabled={showForm}
//             style={{ background: '#2cb7e3' }}
//             onClick={onClick}>
//             <RepeatIcon className="max-h-70px svg-icon-sm svg-icon-white" />
//           </Button>
//         </span>
//       </span>
//     </div>
//   );
// };
