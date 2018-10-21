/*
 * Copyright (C) 2014-2018 Regents of the University of California.
 * @author: Jeff Thompson <jefft0@remap.ucla.edu>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * A copy of the GNU Lesser General Public License is in the file COPYING.
 */

var readline = require('readline');
var Face = require('../..').Face;
var Name = require('../..').Name;
var UnixTransport = require('../..').UnixTransport;

// Connect to the local forwarder with a Unix socket.
var face = new Face(new UnixTransport());

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter a word to echo: ", function(word) {
  var name = new Name("/testecho");
  name.append(word);
  console.log("Express name " + name.toUri());
  face.expressInterestPromise(name)
    .then(function(data) {
      console.log("Got data packet with name " + data.getName().toUri());
      console.log("Payload: " + data.getContent().buf().toString("binary"));
      face.close();
    })
    .catch(function(err) {
      console.log("Error: " + err);
      face.close();
    });
    
  rl.close();
});
