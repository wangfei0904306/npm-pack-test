import createApp, { combinModals } from 'tomatobean';
import { routerConfig } from '../config/routerConfig';
import models from './models';
import internarModels from './internarModels';
import host from '../config/remoteHost';
import { testRequest } from './api/systemApi';

const app = createApp();
// app.config(config);
app.setHost(host);
testRequest().then((res) => {
  // const newConfig = { routes: [], initializationTabs: routerConfig.initializationTabs };
  // routerConfig.routes.forEach((route) => {
  //   res.data.forEach((item) => {
  //     if (item.path === route.path) {
  //       newConfig.routes.push(route);
  //     }
  //   });
  // });
  // console.log(newConfig);

});
app.router(routerConfig);
app.model(combinModals(models, internarModels));
app.run();
