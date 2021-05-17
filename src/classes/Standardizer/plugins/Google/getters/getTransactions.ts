import Google from '../Google'
import { Transaction } from '../../../../../types/schemas'
import withAutoParser from '../../../../../modules/Standardizer/withAutoParser'

// Google put specials space characters in some of their archive directory names
const TRANSACTIONS_FOLDER = 'Takeout/Google Pay/Transactions Google'

interface GoogleTransaction {
  Heure: string,
  Description: string,
  Montant: string,
  'Mode de paiement': string,
  'État': string,
  Produit: string,
}

const currencies = ['EUR', 'USD'];

Google.prototype.getTransactions = withAutoParser(async parser => {
  const files = await parser.listFiles(TRANSACTIONS_FOLDER, { extensionWhitelist: ['csv'] })

  const transactions = await (
    await Promise.all(
      files.map(async file => (
        await parser.parseAsCSV<GoogleTransaction>(file))
        .map((transaction: GoogleTransaction) => ({
          date: new Date(transaction.Heure),
          description: transaction.Description,
          value: parseFloat(transaction.Montant.replace(',', '.')),
          currency: currencies.filter((currency) => (transaction.Montant.includes(currency)))[0],
          paymentMethod: transaction['Mode de paiement'],
          status: transaction['État'],
          product: transaction.Produit,
        } as Transaction))),
    )).flat()

  return transactions
})
