import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateCliente/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/AuthenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesControler";
import { CreateDeliveryController } from "./modules/deliveries/useCase/createDelivery/CreatedeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCase/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCase/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCase/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";



const routes = Router();

const createClientController = new CreateClientController();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const createDeliverymanController = new CreateDeliverymanController();

const deliveryController = new CreateDeliveryController();
const findAllAvailable = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesClient = new FindAllDeliveriesController()
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController
const updateEndDateController = new UpdateEndDateController


routes.post("/client/authenticate/", authenticateClientController.handle);
routes.post("/deliveryman/authenticate/", authenticateDeliverymanController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/delivery", ensureAuthenticateClient, deliveryController.handle)
routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailable.handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesClient.handle)
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle)
routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes };