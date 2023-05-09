//https://youtu.be/ScdflFivL5M

#include <Arduino_JSON.h>

const int greenLedPin = 3;
const int redLedPin = 5;
int trigPin = 9;
int echoPin = 10;
long duration, cm, inches;

JSONVar serialOutput;

void setup() 
{
  Serial.begin(9600);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(greenLedPin, OUTPUT);
  pinMode(redLedPin, OUTPUT);
}

void loop() 
{
  if(Serial.available())
  {
    int led = Serial.parseInt();
    if(led == 1)
    {
      analogWrite(redLedPin, 0);
      analogWrite(greenLedPin, 255);
      delayMicroseconds(1000);
      analogWrite(greenLedPin, 0);
    }
    else if(led == 2)
    {
      analogWrite(redLedPin, 255);
      analogWrite(greenLedPin, 0);
      delayMicroseconds(1000);
      analogWrite(redLedPin, 0);
    }
  }
  
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);

    cm = (duration/2) / 29.1;
    inches = (duration/2) / 74;

    serialOutput["cm"] = cm;
    serialOutput["inches"] = inches;

    Serial.println(serialOutput);
}
