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