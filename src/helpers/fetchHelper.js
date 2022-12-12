import backendConstants from "@/constants/backendConstants";

export default {
    // Method for fetching generically items from a url given and a label of these items
    getFetchedItems: async (target, itemsLabel, backupItems) => {
        // Try catch for handling exceptions
        try {
            // Fetch the response from a URL, by default it is a GET method
            const response = await fetch(backendConstants.domainUrl + target);
            // If we receive a manageable response, return the json parsed response
            if (response.ok) {
                return response.json();
            }
        } catch (error) {
            // If any exception happened, alert the user using the item label and loading the backup items instead
            alert(`Looks like something went wrong loading ${itemsLabel} items: ${error}\nBackup ${itemsLabel} items` +
                `will be loaded if these exist`);
            return backupItems
        }
    },
}