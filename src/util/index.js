import loading_icon from '../img/loading.svg'

const wait = async (t) => {
    return new Promise( resolve => setTimeout(resolve, t) )
}

const Loading = () => {
    return (
        <div className="w-100">
            <img src={loading_icon} />
        </div>
    )
}

export const getDiscountedPrice = (product) => {
    if( parseInt(product.global_discount) > 0 ) {
        return Math.round(parseInt(product.price) - (parseInt(product.price) * (parseInt(product.global_discount)/100)));
    }else return parseInt(product.price);
}