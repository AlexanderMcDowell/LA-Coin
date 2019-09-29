# wuffee

### Transaction API
> A fast and secure wuffee transaction API

```typescript
var transaction = firebase.transfer({
  fromId: "WALLET-ADRESS-1",
  toId: "WALLET-ADRESS-2",
  amount: 50,
  description: "Thanks for the merch"
})
```

You can view the response from the API:
```typescript
transaction.then(res => {
  console.log(res)
})
```

#### Status Codes
`status: wfe_success` Both parties have been debited and credited accordingly

`status: wfe_failure` Bad wallet adress

`status: wfe_funds` User does not have enough wuffee for the transaction to proceed
