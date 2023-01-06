import { address, chainId } from '@lib/stores'
import { CHAINDATA } from '@lib/config'
import { get } from 'svelte/store'

export async function getUserHistory() {

    let _address = get(address)
    let _chainId = get(chainId)

	if (_address == null)
    {
        return []
    }
    else
    {    
        try {        
            const response = await fetch(CHAINDATA[_chainId]['subgraphUrl'], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: 
                    `
                    query MyQuery ($user: String!) {
                        orders(
                          orderDirection: desc
                          orderBy: timestamp
                          where: {user: $user, status_not: active}
                        ) {
                          fee
                          fundingFee
                          id
                          isLong
                          isReduceOnly
                          keeperFee
                          leverage
                          liquidatorFee
                          liquidationPrice
                          margin
                          market
                          orderId
                          orderType
                          pnl
                          price
                          size
                          status
                          timestamp
                          txHash
                          user
                        }
                      }
                    `
                    ,
                    variables: {
                        user: _address
                    }
                })
            });
            const json = await response.json();
            //console.log("JSON RESPONSE", json)
            const orders = json?.data.orders
            return orders;
        } catch (e) {
            console.error('/getUserHistory', e);
        }
    }
}