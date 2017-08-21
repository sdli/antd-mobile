const getQuery= function(props,name){
    const data = props.location.query;
    return data[name];
}

export default getQuery;