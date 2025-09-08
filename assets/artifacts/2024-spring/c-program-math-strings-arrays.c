 /*********************************************************************
 Author: Aykhan Pashayev
 Course: COP 2270 Sec ANSI C 
 Professor : Michael Robinson
 Program #2 : The program covers various topics of C
 { Using functions, using if else statements, for loop, primitive data types, single dimension arrays and ASCII values. }
 Due Date  : 02/15/2024

 Certification:
 I hereby certify that this work is my own and none of it is the work of any other person.

 ..........{ Aykhan Pashayev }..........
 *********************************************************************/
 
#include <stdio.h> // Adding stdio.h class to our program.
#include <math.h> // Adding math.h library for math doing math functions
#include <stdlib.h> // Adding stdlib.h library for random values
#include <string.h> // Adding string.h library for determine string lenght
  
//Functions definitions:
  
void processAbsoluteValues(int i, int j, double x, double y)
{
   // Calculatating absolute values and printing the absolute values
   
   printf("Absolute value of i: %.2f\n", fabs(i));
   printf("Absolute value of j: %.2f\n", fabs(j));
   printf("Absolute value of x: %.2f\n", fabs(x));
   printf("Absolute value of y: %.2f\n", fabs(y));
   printf("\n");
}
  
void processRoundValues(int i, int j, double x, double y) 
{
    // Rounding values and printing the rounded values

   printf("Rounded value of i: %.2f\n", round(i));
   printf("Rounded value of j: %.2f\n", round(j));
   printf("Rounded value of x: %.2f\n", round(x));
   printf("Rounded value of y: %.2f\n", round(y));
   printf("\n");
}
  
void processCeilingValues(int i, int j, double x, double y) 
{
   // Ceiling and printing the ceiling values
   
   printf("Ceiling value of i: %.2f\n", ceil(i));
   printf("Ceiling value of j: %.2f\n", ceil(j));
   printf("Ceiling value of x: %.2f\n", ceil(x));
   printf("Ceiling value of y: %.2f\n", ceil(y));
   printf("\n");
}
  
void processFlooringValues(int i, int j, double x, double y) 
{
    // Flooring values and printing the flooring values

   printf("Floor value of i: %.2f\n", floor(i));
   printf("Floor value of j: %.2f\n", floor(j));
   printf("Floor value of x: %.2f\n", floor(x));
   printf("Floor value of y: %.2f\n", floor(y));
   printf("\n");
}
  
void processMinimunValues(int i, int j, double x, double y) 
{
   // Minimum values and printing the minimum values
   
   printf("Minimum value from i to 100: %.2f\n", fmin(i,100));
   printf("Minimum value from j to 100: %.2f\n", fmin(j,100));
   printf("Minimum value from x to 100: %.2f\n", fmin(x,100));
   printf("Minimum value from y to 100: %.2f\n", fmin(y,100));
   printf("\n");
}
  
void processMaximunValues(int i, int j, double x, double y) 
{
   // Maximum values and printing the maximum values
   
   printf("Maximum value from i to 100: %.2f\n", fmax(i,100));
   printf("Maximum value from j to 120: %.2f\n", fmax(j,120));
   printf("Maximum value from x to 150: %.2f\n", fmax(x,150));
   printf("Maximum value from y to 200: %.2f\n", fmax(y,200));
   printf("\n");
}
  
void processTrigFunctionsValues(int i, int j, double x, double y) 
{
   // Trigonometric functions and printing trigonometric functions (cos, sin, tan)
   
   //Cos values
   printf("Cos value of i: %f\n", cos(i));
   printf("Cos value of j: %f\n", cos(j));
   printf("Cos value of x: %f\n", cos(x));
   printf("Cos value of y: %f\n", cos(y));
   printf("\n");
   
   //Sin values
   printf("Sin value of i: %f\n", sin(i));
   printf("Sin value of j: %f\n", sin(j));
   printf("Sin value of x: %f\n", sin(x));
   printf("Sin value of y: %f\n", sin(y));
   printf("\n");
   
   //Tan values
   printf("Tan value of i: %f\n", tan(i));
   printf("Tan value of j: %f\n", tan(j));
   printf("Tan value of x: %f\n", tan(x));
   printf("Tan value of y: %f\n", tan(y));
   printf("\n");
}
  
void processExponentialValues(int i, int j, double x, double y) 
{
   // Exponential values and printing exponential values
   
   printf("Exponential value of i: %f\n", exp(i));
   printf("Exponential value of j: %f\n", exp(j));
   printf("Exponential value of x: %f\n", exp(x));
   printf("Exponential value of y: %f\n", exp(y));
   printf("\n");
}
  
void processLogValues(int i, int j, double x, double y)
{
   // Log values and and printing log values
   
   printf("Log value of i: %f\n", log(i));
   printf("Log value of j: %f\n", log(j));
   printf("Log value of x: %f\n", log(x));
   printf("Log value of y: %f\n", log(y));
   printf("\n");
}
  
void processPowerValues(int i, int j, double x, double y) 
{
   // Power values and printing power values
   
   printf("Power of i: %.2f\n", pow(i, 2));
   printf("Power of j: %.2f\n", pow(j, 2));
   printf("Power of x: %.2f\n", pow(x, 2));
   printf("Power of y: %.2f\n", pow(y, 2));
   printf("\n");
}
  
void processSquareRootsValues(int i, int j, double x, double y) 
{
   // Square roots values and printing square roots values
   
   printf("Square root of i: %.2f\n", sqrt(i));
   printf("Square root of j: %.2f\n", sqrt(j));
   printf("Square root of x: %.2f\n", sqrt(x));
   printf("Square root of y: %.2f\n", sqrt(y));
   printf("\n");
}
  
void processRandomValues(int i, int j, double x, double y) 
{
   // Random values and printing random values
   
   printf("First random number + i: %d\n", (rand()%100)+i);
   printf("Second random number + j: %d\n", (rand()%100)+j);
   printf("Third random number + x: %.2f\n", (rand()%100)+x);
   printf("Fourth random number + y: %.2f\n", (rand()%100)+y);
   printf("\n");
}
  
void myName(char fullName[]) 
{
int size = strlen(fullName); // Using strlen for determine lenght of the string
   
   for (int i = 0; i < size; i++) // Starting from first index and stop on the last index
   {
   char index = fullName[i]; 

    if ((index == 'A' || index == 'a' || index == 'E' || index == 'e' || index == 'I' || // Using if statement for determine vowels
    index == 'i' || index == 'O' || index == 'o' || index == 'U' || index == 'u'))
    {
     printf("Character [%c] located at position %d is a vowel\n", index, i);
    }

    else if (index == ' ') // Using else if statement for determine spaces
    {
     printf("Character [ ] located at position %d is a space\n", i);
    }

    else if (index == '%' || index == '&') 
    {
     printf("Character [%c] located at position %d is a symbol\n", index, i);
    } 

    else // If the all conditions on the above is not correct then our character is consonant
    {
     printf("Character [%c] located at position %d is a consonant\n", index, i);
    }
 } // Ending of the for loop
} // Ending of the function called myName

void pyramid(char fullName[]) 
{
int size = strlen(fullName); // Using strlen to determine the length of the string

   for (int i = 0; i <= size / 2; i++) // Condition is i<=size / 2 because each time we are removing character from both size
   {
   // Calculating the length of the string to be printed
   int lengthOfString = size - i * 2;
        
      for(int spaces = 0; spaces < i; spaces++) // Using inner for loop for spaces
      {
       printf(" ");
      }

      // Printing the formatted output
  
      printf("%d [", lengthOfString);
        
      // Printing the characters within the square brackets

      for (int k = i; k < i + lengthOfString; k++) // Using another for loop for printing each character
      {
       printf("%c", fullName[k]);
      }
  
      printf("]\n");
   } // Ending of for (int i = 0; i <= size / 2; i++)
} // Ending of function called pyramid

void parsing(char fullName[])
{
int size = strlen(fullName); // Using strlen to determine the length of the string
   
   // Printing letters with upper case letters
   
   for(int i = 0; i<size; i++) 
   {
   char upperCased = toupper(fullName[i]); // With toUpper each character being uppercased
   printf("[%c]", upperCased); 
   }
   
   printf("\n"); // Just adding new line for readable output in terminal
   
   // Printing letters with lower case letters
   
   for(int i = 0; i<size; i++) 
   {
   char lowerCased = tolower(fullName[i]); // With toLower each character being lowercased
   printf("[%c]", lowerCased);
   }
   
   printf("\n"); // Just adding new line for readable output in terminal
   
   // Printing name without spaces
   
   for(int i = 0; i<size; i++)
   {
    char name = fullName[i];
    if(name == ' ')
    {
     continue;
    }

    printf("[%c]", fullName[i]);  
   }
   
   printf("\n"); // Just adding new line for readable output in terminal
   
   // Printing all vowels uppercase and consonants lower case
   
   for(int i = 0; i<size;i++)
   {
    char index = fullName[i];
    if(index == 'A' || index == 'a' || index == 'E' || index == 'e' || index == 'I' || // Using if statement for determine vowels
    index == 'i' || index == 'O' || index == 'o' || index == 'U' || index == 'u')
    {
     printf("[%c]", toupper(fullName[i]));
    }

    else
    {
    printf("[%c]", tolower(fullName[i]));
    }
   }
   
   printf("\n"); // Just adding new line for readable output in terminal
   
   // Printing name on backwards
   
   for(int i = size-1; i>=0; i--)
   {
    char name = fullName[i];
    printf("[%c]", fullName[i]);
   }
   
   printf("\n"); // Just adding new line for readable output in terminal
   
   // Printing name on ASCII values
   
   for(int i = 0; i<size; i++)
   {
    printf("%c: %d\n", fullName[i], fullName[i]);
   }
   
}



int main() 
{ 
//Creating variables
   int i = 7;
   int j = 9;
   double x = 72.5;
   double y = -0.34;

   // Calling functions
   processAbsoluteValues(i, j, x, y);
   processRoundValues(i, j, x, y);
   processCeilingValues(i, j, x, y);
   processFlooringValues(i, j, x, y);
   processMinimunValues(i, j, x, y);
   processMaximunValues(i, j, x, y);
   processTrigFunctionsValues(i, j, x, y);
   processExponentialValues(i, j, x, y);
   processLogValues(i, j, x, y);
   processPowerValues(i, j, x, y);
   processSquareRootsValues(i, j, x, y);
   processRandomValues(i, j, x, y);

   //Creating single dimensional array which contains my full name

   char fullName[] = "Aykhan & MN % Pashayev ";
   //Printing the fullName
   printf("Full Name: %s\n", fullName);
   printf("\n"); // Just adding new line for readable output in terminal

   myName(fullName); // Executing function called myName
   printf("\n");
   
   pyramid(fullName); // Executing function called pyramid
   printf("\n");
   
   parsing(fullName); // Executing function called parsing
   return 0;
} // Ending of main function
 