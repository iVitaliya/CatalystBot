export interface IDatabase {
	all: () => Promise<{ 
		id: string; 
		value: any; 
	}[]>;
	math: {
		/**
		 * Adds provided number to the key.
		 * @param key - The key to where the added number should be set.
		 * @param toAdd - The value to add to the old value.
		 * @returns {Promise<void>} void
		 */
		add: (key: string, toAdd: number) => Promise<void>;
		/**
		 * Devides the old number by the provided number.
		 * @param key - The key to where the devided number should be set. 
		 * @param toMultiplyBy - The value to devide the old number by.
		 * @returns {Promise<void>} void
		 */
		devide: (key: string, toDevide: number) => Promise<void>;
		/**
		 * Multiplies the old number by the provided number.
		 * @param key - The key to where the multiplied number should be set. 
		 * @param toMultiplyBy - The value to multiply the old number by.
		 * @returns {Promise<void>} void
		 */
		multiply: (key: string, toMultiply: number) => Promise<void>;
		/**
		 * Substracts the provided number from the old value.
		 * @param key - The key to where the substracted number should be set.
		 * @param toSubstract - The value to substract from the old value.
		 * @returns {Promise<void>} void
		 */
		substract: (key: string, toSubstract: number) => Promise<void>;		
	};
	core: {
		/**
		 * Checks if the provided key exists in the database.
		 * @param key - The key to search for.
		 * @returns {Promise<boolean>} boolean
		 */
		contains: (key: string) => Promise<boolean>;
		/**
		 * Deletes a key from the database.
		 * @param key - The key to delete.
		 * @returns {Promise<void>} void
		 */
		delete: (key: string) => Promise<void>;
		/**
		 * Deletes all keys from the database.
		 * @returns {Promise<void>} void
		 */
		drop: () => Promise<void>;
		/**
		 * Fetches and returns the data from the provided key. 
		 * @param key - The key to fetch data from.
		 * @param defaultValue - Sets and returns this value if the key didn't exist yet.
		 * @returns {Promise<T>} T
		 */
		get: <T>(key: string, defaultValue: T) => Promise<T>;
		/**
		 * Pushes data to an array with the provided key.
		 * @param key - The key to push the data to.
		 * @param value - The value to push into the array.
		 * @returns {Promise<T>} T
		 */
		push: <T>(key: string, value: any | any[]) => Promise<T[]>;
		/**
		 * Pulls data from an array with the provided key.
		 * @param key - The key to pull data from.
		 * @param value - The value to pull from the array.
		 * @returns {Promise<T>}
		 */
		pull: <T>(key: string, value: any) => Promise<T[]>;
		/**
		 * Sets data for the provided key. 
		 * @param key - The key to set data for.
		 * @param value - The data to assign to the key.
		 * @returns {Promise<T>} T
		 */
		set: <T>(key: string, value: T) => Promise<T>;
	};
}