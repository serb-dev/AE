export default logger = null;

if (process.env.NODE_ENV !== 'production') {
    logger = myLogger()
}
