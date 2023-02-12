import {rest} from 'msw'

export const handlers=[
    rest.get(`https://restcountries.com/v3/name/france`,( req, res, ctx )=>{
        return res(ctx.status(200),
        ctx.json([
        {
            Capital:"Paris"
        },{
            Latitude:46
        },{
            Longitude:2
        }
         
        ]))

    })
]