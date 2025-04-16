import { useState } from 'react';
import axios from 'axios';
import { HOST_FRONT_PROD, tokenUser } from 'src/config-global';

export const useHandleTransaction = (user, resetAfterSuccess, { onPending, onCancelled, onError, onSuccess, onstart }) => {
    const [submiting, setSubmiting] = useState(false);

    const handleTransaction = async (formData) => {
        const dataTransaction = {
            owner: user._id,
            amount: 2600,
            paymentMode: 'ORANGE',
            moneyCode: 'XAF',
            fullName: user.displayName,
            account: formData.numero.toString(),
            typeOfTransaction: 'post_creation',
        };

        try {
            setSubmiting(true);
            onstart?.();

            const response = await axios.post(
                `${HOST_FRONT_PROD}/transaction-payment`,
                dataTransaction,
                {
                    headers: { Authorization: `Bearer ${tokenUser}` },
                }
            );

            const transactionToken = response.data.data.token;

            const intervalId = setInterval(async () => {
                try {
                    const statusResponse = await axios.get(
                        `${HOST_FRONT_PROD}/transaction-payment/status/${transactionToken}`,
                        {
                            headers: { Authorization: `Bearer ${tokenUser}` },
                        }
                    );

                    const message = statusResponse.data;
                    console.log(message);


                    if (message.data === 'financial_transaction_pending') {
                        console.log('✅ Transaction en attente !');
                        onPending?.(); // affichage du dialog en attente

                    }


                    if (message.data === 'financial_transaction_success') {
                        console.log('✅ Transaction reussi !');
                        onSuccess?.(transactionToken); // affichage du dialog en attente
                        clearInterval(intervalId);
                        setSubmiting(false);
                    }

                    if (message.data.message === 'Le payeur a annulé la transaction') {
                        clearInterval(intervalId);
                        console.error('❌ Transaction annulée');
                        setSubmiting(false);
                        onCancelled?.(); // affichage du dialog annulé
                    }



                } catch (error) {
                    console.error('Erreur transaction:', error);
                    setSubmiting(false);
                    onError?.(); // affichage d'un message ou dialog d'erreur
                }

            }, 2000);
        } catch (error) {
            console.error('Erreur transaction:', error);
            setSubmiting(false);
        }
    };

    return { handleTransaction, submiting, setSubmiting };
};
