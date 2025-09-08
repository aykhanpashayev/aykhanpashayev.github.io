/*********************************************************************
 Author: Aykhan Pashayev
 Course: COP 2270 Sec ANSI C 
 Professor : Michael Robinson
 Program #3 : The program covers various topics of C
 { Using multidimensional arrays, swapping, sorting, endless while loops, modules, paralel arrays and ASCII values. }
 Due Date  : 3/21/2024

 Certification:
 I hereby certify that this work is my own and none of it is the work of any other person.

 ..........{ Aykhan Pashayev }..........
 *********************************************************************/
 
#include <stdio.h> // Adding stdio.h class to our program.
#include <string.h> // Adding string.h for determine lenght of an array

void printArray()
{
   int PashayevA2DimArray [10][10]; // Creating an two dimensional array
   int oddTotal = 0;  // Creating variable for calculating sum of 3,5,7 columns
   int evenTotal = 0; // Creating variable for calculating sum of 2,4,6 rows
   
   /*
   For loading each index with multiplication of x and y we need to use two for loops.
   X is using for rows and Y using for columns
   */
   
   for(int x = 0; x<10; x++) 
   {
       
    for(int y = 0; y<10; y++)
     {
     PashayevA2DimArray [x][y] = x*y;
     printf("%3d", PashayevA2DimArray [x][y]);
     }// Ending of inner loop
     
    printf("%s","\n");
    
   } // Ending of for(int x = 0; x<10; x++)
   
   /*
   For calculating sum of values on columns 3,5,7 we gonna use the logic on above
   we just need to change the value of y which represents columns we need to start from 2
   and we need to stop on 7 each time we need to go 2 times because we only need columns 3,5,7.
   */
   
   printf("\n"); // Just adding new line for readable output in terminal
   
   for(int x = 0; x<10; x++)
   {
       
    for(int y = 2; y<7; y+=2)
    {
     oddTotal += PashayevA2DimArray [x][y];
    }// Ending of inner loop
    
   }// Ending of for(int x = 0; x<10; x++)
   
   printf("The total of 3, 5, 7 column is %d\n", oddTotal); // Printing the result
   
   /*
   We need to use same logic but in this case we need to start from 1 stop on 6 and 
   for this time we are calculating values on rows so, we need to do the change on x instead of y.
   */
   
   printf("\n"); // Just adding new line for readable output in terminal
   
    for(int x = 1; x<6; x+=2)
   {
       
    for(int y = 0; y<10; y++)
    {
     evenTotal += PashayevA2DimArray [x][y];
    }
    
   } // Ending of for(int x = 1; x<6; x+=2)
   
   printf("The total of 2,4,6 rows is %d\n", evenTotal);
   
   printf("\n"); // Just adding new line for readable output in terminal
   
   printf("The substraction result is %d\n", evenTotal-oddTotal); // Printing the substraction result
   
   printf("\n"); // Just adding new line for readable output in terminal
  
} // Ending of function printArray()

void ascending(int firstNum, int secondNum, int thirdNum) // This function will get 3 arguments
{
   int temp = 0; // Creating another variable for keeping temproray value
    
   for(int i = 0; i<3;i++) // The function has 3 arguments so, we starting from 0 and stop on 3 and we are increasing each time 
   {
       
    /*
    In this case we gonna use two if statement first one will for swapping the values between first and second numbers
    the second if statement will be for swapping values between second and third numbers.
    */
    
    if(firstNum>secondNum)
    {
    temp = firstNum;
    firstNum = secondNum;
    secondNum = temp;
    }
    
    if(secondNum>thirdNum)
    {
    temp = secondNum;
    secondNum = thirdNum;
    thirdNum = temp;
    }
    
   }// Ending of for loop
   
   printf("%d, %d, %d\n",firstNum, secondNum, thirdNum); // Printing the result
   
   printf("\n"); // Just adding new line for readable output in terminal
   
} // Ending of function

void infiniteLoop()
{
int number = 90; // We need to start from letter Z so we gonna start from 90

   while(1) // 1 inside of paranthesis makes infinite loop
   {
       
    printf("%c: %d\n", number, number);
    number--; // Each time we need to decrease the number so we can go until letter A
    
    if(number == 64)
    {
     break; // When the loop reachs 64 it will stop and exit the loop.
    }
    
  } // Ending of while loop
  
  printf("\n"); // Just adding new line for readable output in terminal
  
} // Ending of function called infiniteLoop

void division()
{
   while(1) // Creating infinite loop 
   {
    printf("%s", "Enter the first number:"); // Asking user to enter first number
    int num1;                                // Creating a value for first number
    scanf("%d", &num1);                      // Using scanf reading user input and assign that value to num1
   
    if(num1 == 999) // If user enters 999 it will terminate the loop
    {
        break;
    } // Ending of  if(num1 == 999)
    
    printf("%s", "Enter the second number:");
    int num2;
    scanf("%d", &num2);
    
    if(num2 == 999)
    {
        break;
    }// Ending of  if(num2 == 999)
    
     while(num2 == 0) // For keep asking to user renter the number we use another while loop inside of for statement
     {
     printf("%s", "The number you entered is invalid, please renter the number:");
     scanf("%d", &num2);
     } // Ending of while(num2 == 0)
     
     if( num2 == 999) // If user enters 999 it will still terminate the loop
     {
         break;
     } // Ending of if( num2 == 999)
     
    
    float result = (num1/num2); // Creating float variable for result
    
    printf("The first number %d divided by the second number %d = %.2f\n\n",num1,num2,result); // Printing the result
    }// Ending of while(1)
    
   printf("\n"); // Just adding new line for readable output in terminal
    
}// Ending of the function


void moduleWhile()
{
   int number = 0; // Creating variable
   
   while(number<=100) // Using while loop for go from 0 to 100
   {
    if(number % 5 == 3) // Adding if statement and using module if the number %5 is equals to 3 then print the number
    {
        printf("%2d mod 5 = 3\n", number);
    }
    number++; // Each time we need to increment for going to next number
   }// Ending of while loop
   printf("\n"); // Just adding new line for readable output in terminal
} // Ending of void moduleWhile()

void paralelArrays()
{
   char one [3][30] = {"This ANSI C","at","is"}; // Creating an array called one data type is char because it stores characters
   char two [3][30] = {"class ","FIU ", "challenging && enjoyable"}; // Creating another array
   /*
   one[0] = "This ANSI C "  ;
   two[0] = "class";
   one[1] = "at ";            
   two[1] = "FIU";
   one[2] = "is ";            
   two[2] = "challenging && enjoyable";
   */
   for(int i = 0; i<3; i++) // Using for loop for printing arrays paralel we will execute 3 times because our arrays only contains 3 parameters
   {
    printf("%s %s", one[i], two[i]);
   }
}// Ending of function
   
    
    

int main()
{
   // Calling the functions
   
   printArray(); 
   ascending(23,7,81);
   infiniteLoop();
   division();
   moduleWhile();
   paralelArrays();
   
   return 0;
} // Ending of main function