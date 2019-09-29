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

You can view the response from the API by using:
```typescript
transaction.then(res => {
  console.log(res)
 })
```
