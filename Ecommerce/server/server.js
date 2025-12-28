import app from './app.js';
import config from './src/utils/config.js'
import logger from './src/utils/logger.js'

const PORT = config.PORT || 8000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
})