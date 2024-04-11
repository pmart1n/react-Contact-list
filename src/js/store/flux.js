
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
			contacts: null
		},
		actions: {
			login: () => {
				setStore({isLogin: true});
				localStorage.setItem("isLogin", true)
			},
			logout: () => {setStore({isLogin: false})},
			assignUser: (item) => { setStore({ currentUser: item }) },
			//25.3 17.20
			clearUser: () => { setStore({ currentUser: null }) },
			//25.3 31.11
			addFavorites: (newFavorite) => {
				setStore({ favorites: [...getStore().favorites,newFavorite]})
			},
			//25.3 41.11 , 44.44
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
			//26 8.50
			addContact : async (dataToSend) => {
				const options = {
					method: 'POST',
					body: JSON.stringify(dataToSend),
					headers: {'Content-type': 'application/json' }
				}
				
				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", options)
				if (!response.ok) return
				const data = await response.json();
				//26 57.15 
				getActions().getContacts();
			},
			//26 20.44
			getContacts : async () => {
				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/" + getStore().agenda)
				if (!response.ok) return
				const data = await response.json();
				setStore({contacts: data })
				localStorage.setItem("contactList", JSON.stringify(data))
			},
			deleteContact: async (contact_id) => {
				const response = await fetch(
				  `https://playground.4geeks.com/apis/fake/contact/${contact_id}`,
				  {
					method: 'DELETE',
				  }
				);
			
				if (response.ok) {
				  getActions().getContacts(); // Refresh the contact list after deletion
				} else {
				  console.error("There was an error deleting the contact.");
				}
			  },
			  editContact: async (contact_id, updatedData) => {
				const options = {
				  method: 'PUT',
				  body: JSON.stringify(updatedData),
				  headers: {
					'Content-type': 'application/json',
				  },
				};
			  
				try {
				  const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact_id}`, options);
			  
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
