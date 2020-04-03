
##################################################################################################################
########################################	 Manage User Details	##############################################
##################################################################################################################

1 - Main page having all the user listed with following information				[Done]
	FirstName | LastName | Email | Address | View/Edit/Delete
	If someone uploading image with user details 
	then image will also be displayed with dimensions 75x75.
------------------------------------------------------------------------------------------------------------------

2 - Search Field																[Done]
	
	The field will be placed at the top of list that will filter records 
	by matching the keyword with FirstName and LastName. 
	(Make sure data is filtering on onChange event of search field).
------------------------------------------------------------------------------------------------------------------

3 - Add User Information														[Done]

	1. FirstName								[ ^[a-z A-Z]{5,10}$ ]
			(Minimum 5 characters) 
			(Not null) 
			(Maximum 10 characters) 
			(No numbers and special characters are allowed) 

	2. LastName									[ ^[a-z A-Z]{5,10}$ ]
			(Minimum 5 characters) 
			(Not null) 
			(Maximum 10 characters) 
			(No numbers and special characters are allowed) 

	3. Email
			(Valid email address) 
			(Not null)							[ \b[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b ]

	4. Phone									[ ^(\+92|92|03|0092)\d{10}$ ]
			(Not null) 
			(All valid phone numbers 
				like 03328578010/+923328578010/00923328578010) 

	5. Address
			(Not null) 
			(Maximum 100 characters)  [str.length() > 0 && str.length() < 0]
	
	6. User Avatar  (optional) 
			(Upload small images)

	7. Any other fields (optional)


	
On submit store the data in local storage with User_Details collection name.
------------------------------------------------------------------------------------------------------------------

4 - Edit User Details														[Done]
	On edit - pull the selected record from localStorage 
	and populate all the fields in User Form 
	and then on submit update that record in localStorage.
------------------------------------------------------------------------------------------------------------------

5 - Delete the selected record from localStorage.							[Done]
------------------------------------------------------------------------------------------------------------------

6 - Multiple delete (optional but ++)										[Done]
	Add checkboxes with all the records in listing 
	and then select multiple records and delete at once.
	It will add 2 more points.
------------------------------------------------------------------------------------------------------------------

7 - UI (optional but +++)													[Done]
	The good UI will add 3 more points.
------------------------------------------------------------------------------------------------------------------
