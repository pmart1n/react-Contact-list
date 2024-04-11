import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home.jsx";
import injectContext from "./store/appContext.js";
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import { Contact } from "./views/Contact.jsx";
import { ContactDetails } from "./views/ContactDetails.jsx";
import { Demo } from "./views/demo.js";
import { ContactEdit } from "./views/ContactEdit.jsx";
import { ContactList } from "./views/ContactList.jsx";
import { CreateContact } from "./views/CreateContact.jsx";
import ScrollToTop from "./component/scrollToTop.js";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	//<Route path="/contacts-edit" element={<ContactEdit/>}/>
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/contacts" element={<Contact/>}/>
						<Route path="/contacts/:idContact" element={<ContactDetails/>}/>	
						<Route path="/contacts-edit" element={<ContactEdit/>}/>
						<Route path="/contact-list" element ={<ContactList/>}/>
						<Route path="/create-contact" element={<CreateContact/>}/>
						<Route path="/demo" element={<Demo/>} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
