
import dva from 'dva';
import './index.css';
import createLoading from "dva-loading";

// 1. Initialize
const app = dva(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user'));
app.model(require('./models/video'));
app.model(require('./models/static'));
app.model(require('./models/toast'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
