export default function Order(){
    function onSelectChange(e){
        console.log(e.target.value)
    }
    return <select name="select" onChange={onSelectChange}>
        <option value="ascendente">ascendente</option>
        <option value="descendente">descendente</option>
    </select>
}