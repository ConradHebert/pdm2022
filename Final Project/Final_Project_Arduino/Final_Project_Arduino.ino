#include "PDMSerial.h"

PDMSerial pdm;

const int joystickX = A2;
const int joystickY = A1;
const int hitPin = 12;
const int missPin = 13;

int xPosition = 0;
int yPosition = 0;
int mapX = 0;
int mapY = 0;

void setup() {
  pinMode(joystickX, INPUT);
  pinMode(joystickY, INPUT);
  Serial.begin(9600);
}

void loop() {
  xPosition = analogRead(joystickX);
  yPosition = analogRead(joystickY);
  mapX = map(xPosition, 0, 1023, -512, 512);
  mapY = map(yPosition, 0, 1023, -512, 512);
  pdm.transmitSensor("a2", mapX);
  pdm.transmitSensor("a1", mapY);
  boolean newData = pdm.checkSerial();
  if(newData) {
    if(pdm.getName().equals(String("led1"))) {
      digitalWrite(hitPin, HIGH);
      delay(1000);
      digitalWrite(hitPin, LOW);
    } else if (pdm.getName().equals(String("led2"))) {
      digitalWrite(missPin, HIGH);
      delay(1000);
      digitalWrite(missPin, LOW);
    }
  }
 
  pdm.transmitSensor("end");
}
