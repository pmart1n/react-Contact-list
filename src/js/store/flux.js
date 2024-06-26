
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			favorites:[],
			users:[],
			currentUser: null,
			mensaje: "Home",
			isLogin: false,
			agenda: "ptt_agenda",
			contacts: []
		},
		actions: {
			login: () => {
				setStore({isLogin: true});
				localStorage.setItem("isLogin", true)
			},
			logout: () => {setStore({isLogin: false})},
			assignUser: (item) => { setStore({ currentUser: item }) },
			clearUser: () => { setStore({ currentUser: null }) },
			addFavorites: (newFavorite) => {
				setStore({ favorites: [...getStore().favorites,newFavorite]})
			},
			removeFavorites: (item, array) => {
				setStore({ favorites: array.filter((element) => element != item) })
			},
			getUsers: async () => {
				const url = "https://jsonplaceholder.typicode.com/users";
				const options = {
					method: "GET"
				};
				const response = await fetch(url,options)
				if(!response.ok){

					console.log("Error en el fetch",response.status,response.statusText)
					return response.status
				}
				const data = await response.json()
				console.log(data)
				setStore({users:data})
				localStorage.setItem("usuarios", JSON.stringify(data))
			},
			addContact: async (dataToSend) => {
				// Extraer slug de dataToSend si es necesario
				const { slug } = dataToSend;
				const options = {
					method: 'POST',
					body: JSON.stringify(dataToSend),
					headers: {'Content-Type': 'application/json'}
				};
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, options);
				if (!response.ok) {
					// Manejar adecuadamente una respuesta no exitosa
					console.error("Error al añadir la agenda", await response.text());
					return;
				}
				// Si la respuesta es exitosa, actualizamos los contactos.
				getActions().getContacts();
			},
			getContacts : async () => {
				const response = await fetch("https://playground.4geeks.com/contact/agendas/")
				if (!response.ok) return
				const data = await response.json();
				setStore({ contacts: data })
				localStorage.setItem("contactList", JSON.stringify(data))
			},
			deleteContact: async (slug) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
						method: 'DELETE',
					});
					if (response.ok) {
						// Obtén el estado actual
						const store = getStore();
						// Filtra el contacto eliminado basándote en el slug
						const updatedAgendas = store.contacts.agendas.filter(agenda => agenda.slug !== slug);
						// Actualiza el estado con los contactos filtrados
						setStore({ contacts: { ...store.contacts, agendas: updatedAgendas } });
					} else {
						console.error("Error deleting the contact");
					}
				} catch (error) {
					console.error("There was an error deleting the contact:", error);
				}
			},
			  editContact: async (slug, updatedData, id) => {
				const options = {
				  method: 'PUT',
				  body: JSON.stringify(updatedData),
				  headers: {
					'Content-type': 'application/json',
				  },
				};
			  
				try {
				  const response = await fetch(`https://playground.4geeks.com/agendas/${slug}/contacts/${id}`, options);
			  
				  if (!response.ok) {
					throw new Error('Failed to update contact');
				  }
			  
				  getActions().getContacts(); // Refresh the contact list after editing
				} catch (error) {
				  console.error("There was an error updating the contact:", error);
				}
			  },
			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
