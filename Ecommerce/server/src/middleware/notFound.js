const notFound  = (req,res,_next)=>{
    _next({
        status:404,
        message:`Cannot find ${req.originalUrl} on this server`
    });
};

export default notFound;