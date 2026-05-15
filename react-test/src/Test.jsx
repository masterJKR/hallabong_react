function Test(props){
    return(
        <>
            <h1> 내 이름은 , {props.name}</h1>
            <p> 나이는 {props.age}</p>
        </>
    );
}

export default Test;