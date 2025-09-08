 /*********************************************************************
 Author: Aykhan Pashayev
 Course: COP 2270 Sec ANSI C 
 Professor : Michael Robinson
 Program # : The program covers fundamental concepts of C
 { Using multiple data types, declaring variables, assign values to them. Using functions, passing parameters. Doing calculations and priting the results. Using for and while loops. }
 Due Date  : 01/31/2024

 Certification:
 I hereby certify that this work is my own and none of it is the work of any other person.

 ..........{ Aykhan Pashayev }..........
 *********************************************************************/

 //Numerical Computations

 #include <stdio.h> //Adding stdio.h class to our program.
 void numericalComputations(){ //Calling our function.
   int maximunNumber = 10; //Assigning value 10 to integer maximumNumber
   //Displaying each result for each computations:
   //Displaying results for modules computations:
   
   printf("%d %% 1 = %d\n", maximunNumber, maximunNumber % 1);
   printf("%d %% 2 = %d\n", maximunNumber, maximunNumber % 2);
   printf("%d %% 3 = %d\n", maximunNumber, maximunNumber % 3);
   printf("%d %% 4 = %d\n", maximunNumber, maximunNumber % 4);
   printf("%d %% 5 = %d\n", maximunNumber, maximunNumber % 5);
   printf("%d %% 6 = %d\n", maximunNumber, maximunNumber % 6);
   printf("%d %% 7 = %d\n", maximunNumber, maximunNumber % 7);
   printf("%d %% 8 = %d\n", maximunNumber, maximunNumber % 8);
   printf("%d %% 9 = %d\n", maximunNumber, maximunNumber % 9);
   printf("%d %% 10 = %d\n", maximunNumber, maximunNumber % 10);
   
   //Displaying results for subtraction computations:
   
   printf("%d - 1 = %d\t", maximunNumber, maximunNumber - 1);
   printf("%d - 2 = %d\t", maximunNumber, maximunNumber - 2);
   printf("%d - 3 = %d\t", maximunNumber, maximunNumber - 3);
   printf("%d - 4 = %d\t", maximunNumber, maximunNumber - 4);
   printf("%d - 5 = %d\t", maximunNumber, maximunNumber - 5);
   printf("%d - 6 = %d\t", maximunNumber, maximunNumber - 6);
   printf("%d - 7 = %d\t", maximunNumber, maximunNumber - 7);
   printf("%d - 8 = %d\t", maximunNumber, maximunNumber - 8);
   printf("%d - 9 = %d\t", maximunNumber, maximunNumber - 9);
   printf("%d - 10 = %d\n", maximunNumber, maximunNumber - 10);
   
   //Displaying results for addition computations:
   
   printf("%d + 1 = %d\n", maximunNumber, maximunNumber + 1);
   printf("%d + 2 = %d\n", maximunNumber, maximunNumber + 2);
   printf("%d + 3 = %d\n", maximunNumber, maximunNumber + 3);
   printf("%d + 4 = %d\n", maximunNumber, maximunNumber + 4);
   printf("%d + 5 = %d\n", maximunNumber, maximunNumber + 5);
   printf("%d + 6 = %d\n", maximunNumber, maximunNumber + 6);
   printf("%d + 7 = %d\n", maximunNumber, maximunNumber + 7);
   printf("%d + 8 = %d\n", maximunNumber, maximunNumber + 8);
   printf("%d + 9 = %d\n", maximunNumber, maximunNumber + 9);
   printf("%d + 10 = %d\n", maximunNumber, maximunNumber + 10);
   
   //Displaying results for multiplication computations:
   
   printf("%d * 1 = %d\t", maximunNumber, maximunNumber * 1);
   printf("%d * 2 = %d\t", maximunNumber, maximunNumber * 2);
   printf("%d * 3 = %d\t", maximunNumber, maximunNumber * 3);
   printf("%d * 4 = %d\t", maximunNumber, maximunNumber * 4);
   printf("%d * 5 = %d\t", maximunNumber, maximunNumber * 5);
   printf("%d * 6 = %d\t", maximunNumber, maximunNumber * 6);
   printf("%d * 7 = %d\t", maximunNumber, maximunNumber * 7);
   printf("%d * 8 = %d\t", maximunNumber, maximunNumber * 8);
   printf("%d * 9 = %d\t", maximunNumber, maximunNumber * 9);
   printf("%d * 10 = %d\n", maximunNumber, maximunNumber * 10);
   
   //Displaying results for division computations:
   
   printf("%d / 1 = %d\n", maximunNumber, maximunNumber / 1);
   printf("%d / 2 = %d\n", maximunNumber, maximunNumber / 2);
   printf("%d / 3 = %d\n", maximunNumber, maximunNumber / 3);
   printf("%d / 4 = %d\n", maximunNumber, maximunNumber / 4);
   printf("%d / 5 = %d\n", maximunNumber, maximunNumber / 5);
   printf("%d / 6 = %d\n", maximunNumber, maximunNumber / 6);
   printf("%d / 7 = %d\n", maximunNumber, maximunNumber / 7);
   printf("%d / 8 = %d\n", maximunNumber, maximunNumber / 8);
   printf("%d / 9 = %d\n", maximunNumber, maximunNumber / 9);
   printf("%d / 10 = %d\n", maximunNumber, maximunNumber / 10);
 }
 
  //Sum of numbers

  void sumOfNumbers(){ //Calling our function
   int N = 100; //Assigning value 100 to integer N
   int sum = (1 + N) * (N / 2);
   printf("The sum of numbers from 1 to 100 is: %d\n", sum); //Printing the result
  }
  
  //Creating function calls myInfo which displays all information.
  /*
   char name[]                   = "Aykhan";
   char major[]           = "Cybersecurity";
   int totalCredits                    = 42;
   int takingCredits                   = 12;
   char className[] = "COP 2270 Sec ANSI C";
   */

  void myInfo(char name[], char major[], int totalCredits, int takingCredits, char className[]) { //Passing the parameters in the main to this function
   printf("Hi, my name is %s.\n", name);
   printf("My major is %s.\n", major);
   printf("I have completed %d credits.\n", totalCredits);
   printf("I am taking %d credits this semester.\n", takingCredits);
   printf("This class's name is %s.\n", className);
}

  //Doing numericalComputations using for loop

  void numericalComputationsForLoop() {
   int maximunNumber = 10;
   
   /*//In each for loop. We know we have to start from 1 so int i = 1;.
   We need execute the statement 10 times so, i<=10 is our condition.
   The each time the number should increase so i++.
   */
   
   // Displaying results for modules computations:
   for (int i = 1; i <= 10; i++) {
   printf("%d %% %d = %d\n", maximunNumber, i, maximunNumber % i);
   }
   
   // Displaying results for subtraction computations:
   for (int i = 1; i <= 10; i++) {
   printf("%d - %d = %d\t", maximunNumber, i, maximunNumber - i);
   }
   
   // Displaying results for addition computations:
   for (int i = 1; i <= 10; i++) {
   printf("%d + %d = %d\n", maximunNumber, i, maximunNumber + i);
   }
   
   // Displaying results for multiplication computations:
   for (int i = 1; i <= 10; i++) {
   printf("%d * %d = %d\t", maximunNumber, i, maximunNumber * i);
   }
   
   // Displaying results for division computations:
   for (int i = 1; i <= 10; i++) {
   printf("%d / %d = %d\n", maximunNumber, i, maximunNumber / i);
   }
  }

  //Doing numericalComputations using while loop

void numericalComputationsWhileLoop() {
   int maximunNumber = 10;
   
   // Displaying results for modules computations:
   int i = 1;
   while (i <= 10) {
   printf("%d %% %d = %d\n", maximunNumber, i, maximunNumber % i);
   i++;
   }
   
   // Displaying results for subtraction computations:
   int a = 1;
   while (a <= 10) {
   printf("%d - %d = %d\t", maximunNumber, i, maximunNumber - i);
   a++;
   }
   
   // Displaying results for addition computations:
   int b = 1;
   while (b <= 10) {
   printf("%d + %d = %d\n", maximunNumber, i, maximunNumber + i);
   b++;
   }
   
   // Displaying results for multiplication computations:
   int c = 1;
   while (c <= 10) {
   printf("%d * %d = %d\t", maximunNumber, i, maximunNumber * i);
   c++;
   }
   
   // Displaying results for division computations:
   int d = 1;
   while (d <= 10)
   {
       printf("%d / %d = %d\n", maximunNumber, i, maximunNumber / i);
       d++;
   }
   }
	
  //Sum of all numbers using for loop

  void sumOfNumbersForLoop() {
   int N = 100;
   int sum = 0;
   /*In this for loop we need sum of numbers from 1 to 100 so we'll start from 1 i = 1;
   We know we will execute the program 100 times so our condition can be i<=100 or i<=N.
   Also, we need to increment i every time so i++.
   */

   for (int i = 1; i <= N; i++)
   { 
       sum += i;
   }

   printf("The sum of all numbers from 1 to 100 is: %d\n", sum); //Printing the result which will be 5050.
}


 int main() { //Calling our main function
  //Creating variables and assign values for name, major, totalCredits, takingCredits, and className.
   char name[]                   = "Aykhan";
   char major[]           = "Cybersecurity";
   int totalCredits                    = 42;
   int takingCredits                   = 12;
   char className[] = "COP 2270 Sec ANSI C";
  
   numericalComputations(); //Executing numericalComputations which has 50 printf statements
   
   sumOfNumbers(); //Executing sumOfNumbers which is using just regular formula
   
   myInfo(name, major, totalCredits, takingCredits, className); //Executing myInfo which will show all information about me
   
   numericalComputationsForLoop();  //Executing numericalComputationsForLoop which instead of using 50 print statement we are using just 5 for loops 
   
   numericalComputationsWhileLoop(); //Executing numericalComputationsWhileLoop which instead of using 50 print statement we are just using 5 while loops
   
   sumOfNumbersForLoop(); //Executing sumOfNumbersForLoop which instead of using formula its using for loop
   
   return 0;
 }