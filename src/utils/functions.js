export const calculate_total = (items) =>{
    return items.reduce((acc, item)=>(acc+=item.price*item.quantity),0)
}
