//https://youtu.be/Ngna2jyWE-4

#include <Arduino_JSON.h>

const int ledPin = 12;
int trigPin = 9;
int echoPin = 10;
long duration, cm, inches;

JSONVar serialOutput;

void setup() 
{
  Serial.begin(9600);

  pinMode(ledPin, OUTPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() 
{
  byte brightness;

  if(Serial.available())
  {
    brightness = Serial.read();
    analogWrite(ledPin, brightness);
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