import React from "react";
import "./Transactions.css"

export const Transactions = ({transactions}) => {
    //improve tx parsing include internal payments, incomplete, etc

    const parseTx = (tx) => {
        
        if (tx.pending) {
            return 'Pending...'
        }

        const bolt11 = tx.bolt11
        const boltLength = bolt11.length
        const isDeposit = tx.amount > 0
        const txText = isDeposit ? `Received from` : `Sent with`
        const isPlus = isDeposit ? `+` : ``
        const amount = tx.amount / 1000
        const isPlural = (amount !== 1 && amount !== -1)
        const isPluralTxt = isPlural ? `sats` : `sat`
        const date = new Date(tx.time * 1000)
        const formatedDate = date.toLocaleDateString("en-US")

            return (                
                <div key={tx.checking_id} className="tx-item">
                    <p>{txText} {bolt11.substring(0, 11)}...{bolt11.substring((boltLength - 11), boltLength)}</p>
                    <p>{isPlus}{amount} {isPluralTxt}</p>
                    <p className="transaction-date">{formatedDate}</p>
                </div>
            )
        }

         return (
            <div>
                <h3>Transactions</h3>
                {transactions.map((transaction) => {
                    return parseTx(transaction)
                })}
            </div>
         )
    }

export default Transactions