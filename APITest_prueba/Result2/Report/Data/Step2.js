﻿function _get_dyn_external_content_for_st(){return '<div><style>.basic-block table td.no-border{padding-left:0;}</style><div class="st-act-wrapper "><div class="block basic-block"><table><tr><td class="name col-head-style">Name</td><td class="name col-head-style">Step ID</td><td class="name col-head-style">Status</td><td class="name col-head-style">Message</td></tr><tr><td class="value col-head-style">GetFlights</td><td class="value col-head-style">StServiceCallActivity4</td><td class="value col-head-style">Done</td><td class="value col-head-style">Web service call performed successfully</td></tr></table></div><div class="block other-props-block"><div class="block-title">More</div><table><tr><td class="name row-head-style">InputXml</td><td class="value row-head-style"><a href="####" onclick="__uiElements.show_content_in_float_pane(\'Data/StServiceCallActivity4_InputXml_8f133507-fd27-477f-9a05-94d0f84b5b10.xml\', \'Data/StServiceCallActivity4_InputXml_8f133507-fd27-477f-9a05-94d0f84b5b10.js4hrpt\', \'.xml\', \'InputXml\');return false;">&lt;Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"&gt;\r\n  &lt;Body&gt;\r\n    &lt;GetFlights xmlns="HP.SOAQ.SampleApp"&gt;\r\n      &lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;\r\n      &lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;\r\n      &lt;FlightDate&gt;2020-05-15T00:00:00-06:00&lt;/FlightDate&gt;\r\n    &lt;/GetFlights&gt;\r\n  &lt;/Body&gt;\r\n&lt;/Envelope&gt;</a></td></tr><tr><td class="name row-head-style">Service</td><td class="value row-head-style">Flights_Service</td></tr><tr><td class="name row-head-style">Port</td><td class="value row-head-style">FlightsServiceMethods</td></tr><tr><td class="name row-head-style">Operation</td><td class="value row-head-style">GetFlights</td></tr><tr><td class="name row-head-style">Address</td><td class="value row-head-style">http://localhost:8000/Flights_SOAP</td></tr><tr><td class="name row-head-style">SOAPAction</td><td class="value row-head-style">HP.SOAQ.SampleApp/IFlightsSoapService/GetFlights</td></tr><tr><td class="name row-head-style">ContentType</td><td class="value row-head-style">text/xml; charset=utf-8</td></tr><tr><td class="name row-head-style">MessageExchangePattern</td><td class="value row-head-style">Request Response</td></tr><tr><td class="name row-head-style">Full request</td><td class="value row-head-style"><a href="####" onclick="__uiElements.show_content_in_float_pane(\'Data/StServiceCallActivity4_Full_request_6c368ff1-c3bd-4d98-a129-581257224b40.xml\', \'Data/StServiceCallActivity4_Full_request_6c368ff1-c3bd-4d98-a129-581257224b40.js4hrpt\', \'.xml\', \'Full request\');return false;">&lt;Envelope xmlns="htt ... &lt;/Body&gt;\r\n&lt;/Envelope&gt;</a></td></tr><tr><td class="name row-head-style">InputHeader</td><td class="value row-head-style">SOAPAction:	HP.SOAQ.SampleApp/IFlightsSoapService/GetFlights\nContent-Type:	text/xml; charset=utf-8\nHost:	localhost:8000\nContent-Length:	303\nExpect:	100-continue\nConnection:	Close\n</td></tr><tr><td class="name row-head-style">OutputHeader</td><td class="value row-head-style">Connection:	close\nContent-Length:	1676\nContent-Type:	text/xml; charset=utf-8\nDate:	Fri, 15 May 2020 20:26:49 GMT\nServer:	Microsoft-HTTPAPI/2.0\n</td></tr><tr><td class="name row-head-style">OutputText</td><td class="value row-head-style">&lt;s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"&gt;&lt;s:Body&gt;&lt;GetFlightsResponse xmlns="HP.SOAQ.SampleApp"&gt;&lt;GetFlightsResult xmlns:i="http://www.w3.org/2001/XMLSchema-instance"&gt;&lt;Flight&gt;&lt;Airline&gt;NW&lt;/Airline&gt;&lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;&lt;ArrivalTime&gt;12:41 PM&lt;/ArrivalTime&gt;&lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;&lt;DepartureTime&gt;10:46 AM&lt;/DepartureTime&gt;&lt;FlightNumber&gt;10638&lt;/FlightNumber&gt;&lt;Price&gt;155.2&lt;/Price&gt;&lt;/Flight&gt;&lt;Flight&gt;&lt;Airline&gt;NW&lt;/Airline&gt;&lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;&lt;ArrivalTime&gt;03:05 PM&lt;/ArrivalTime&gt;&lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;&lt;DepartureTime&gt;01:10 PM&lt;/DepartureTime&gt;&lt;FlightNumber&gt;13450&lt;/FlightNumber&gt;&lt;Price&gt;148.4&lt;/Price&gt;&lt;/Flight&gt;&lt;Flight&gt;&lt;Airline&gt;SR&lt;/Airline&gt;&lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;&lt;ArrivalTime&gt;11:30 AM&lt;/ArrivalTime&gt;&lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;&lt;DepartureTime&gt;08:00 AM&lt;/DepartureTime&gt;&lt;FlightNumber&gt;13534&lt;/FlightNumber&gt;&lt;Price&gt;159.9&lt;/Price&gt;&lt;/Flight&gt;&lt;Flight&gt;&lt;Airline&gt;SR&lt;/Airline&gt;&lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;&lt;ArrivalTime&gt;01:54 PM&lt;/ArrivalTime&gt;&lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;&lt;DepartureTime&gt;10:24 AM&lt;/DepartureTime&gt;&lt;FlightNumber&gt;13538&lt;/FlightNumber&gt;&lt;Price&gt;161&lt;/Price&gt;&lt;/Flight&gt;&lt;Flight&gt;&lt;Airline&gt;SR&lt;/Airline&gt;&lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;&lt;ArrivalTime&gt;04:18 PM&lt;/ArrivalTime&gt;&lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;&lt;DepartureTime&gt;12:48 PM&lt;/DepartureTime&gt;&lt;FlightNumber&gt;13542&lt;/FlightNumber&gt;&lt;Price&gt;168.4&lt;/Price&gt;&lt;/Flight&gt;&lt;Flight&gt;&lt;Airline&gt;SR&lt;/Airline&gt;&lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;&lt;ArrivalTime&gt;06:42 PM&lt;/ArrivalTime&gt;&lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;&lt;DepartureTime&gt;03:12 PM&lt;/DepartureTime&gt;&lt;FlightNumber&gt;13546&lt;/FlightNumber&gt;&lt;Price&gt;165.6&lt;/Price&gt;&lt;/Flight&gt;&lt;/GetFlightsResult&gt;&lt;/GetFlightsResponse&gt;&lt;/s:Body&gt;&lt;/s:Envelope&gt;</td></tr><tr><td class="name row-head-style">HttpStatusCode</td><td class="value row-head-style">200 : OK</td></tr><tr><td class="name row-head-style">OutputXml</td><td class="value row-head-style"><a href="####" onclick="__uiElements.show_content_in_float_pane(\'Data/StServiceCallActivity4_OutputXml_8d40f26c-3ea0-41bc-88a8-9730f13a7a34.xml\', \'Data/StServiceCallActivity4_OutputXml_8d40f26c-3ea0-41bc-88a8-9730f13a7a34.js4hrpt\', \'.xml\', \'OutputXml\');return false;">&lt;s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"&gt;\r\n  &lt;s:Body&gt;\r\n    &lt;GetFlightsResponse xmlns="HP.SOAQ.SampleApp"&gt;\r\n      &lt;GetFlightsResult xmlns:i="http://www.w3.org/2001/XMLSchema-instance"&gt;\r\n        &lt;Flight&gt;\r\n          &lt;Airline&gt;NW&lt;/Airline&gt;\r\n          &lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;\r\n          &lt;ArrivalTime&gt;12:41 PM&lt;/ArrivalTime&gt;\r\n          &lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;\r\n          &lt;DepartureTime&gt;10:46 AM&lt;/DepartureTime&gt;\r\n          &lt;FlightNumber&gt;10638&lt;/FlightNumber&gt;\r\n          &lt;Price&gt;155.2&lt;/Price&gt;\r\n        &lt;/Flight&gt;\r\n        &lt;Flight&gt;\r\n          &lt;Airline&gt;NW&lt;/Airline&gt;\r\n          &lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;\r\n          &lt;ArrivalTime&gt;03:05 PM&lt;/ArrivalTime&gt;\r\n          &lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;\r\n          &lt;DepartureTime&gt;01:10 PM&lt;/DepartureTime&gt;\r\n          &lt;FlightNumber&gt;13450&lt;/FlightNumber&gt;\r\n          &lt;Price&gt;148.4&lt;/Price&gt;\r\n        &lt;/Flight&gt;\r\n        &lt;Flight&gt;\r\n          &lt;Airline&gt;SR&lt;/Airline&gt;\r\n          &lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;\r\n          &lt;ArrivalTime&gt;11:30 AM&lt;/ArrivalTime&gt;\r\n          &lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;\r\n          &lt;DepartureTime&gt;08:00 AM&lt;/DepartureTime&gt;\r\n          &lt;FlightNumber&gt;13534&lt;/FlightNumber&gt;\r\n          &lt;Price&gt;159.9&lt;/Price&gt;\r\n        &lt;/Flight&gt;\r\n        &lt;Flight&gt;\r\n          &lt;Airline&gt;SR&lt;/Airline&gt;\r\n          &lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;\r\n          &lt;ArrivalTime&gt;01:54 PM&lt;/ArrivalTime&gt;\r\n          &lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;\r\n          &lt;DepartureTime&gt;10:24 AM&lt;/DepartureTime&gt;\r\n          &lt;FlightNumber&gt;13538&lt;/FlightNumber&gt;\r\n          &lt;Price&gt;161&lt;/Price&gt;\r\n        &lt;/Flight&gt;\r\n        &lt;Flight&gt;\r\n          &lt;Airline&gt;SR&lt;/Airline&gt;\r\n          &lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;\r\n          &lt;ArrivalTime&gt;04:18 PM&lt;/ArrivalTime&gt;\r\n          &lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;\r\n          &lt;DepartureTime&gt;12:48 PM&lt;/DepartureTime&gt;\r\n          &lt;FlightNumber&gt;13542&lt;/FlightNumber&gt;\r\n          &lt;Price&gt;168.4&lt;/Price&gt;\r\n        &lt;/Flight&gt;\r\n        &lt;Flight&gt;\r\n          &lt;Airline&gt;SR&lt;/Airline&gt;\r\n          &lt;ArrivalCity&gt;Paris&lt;/ArrivalCity&gt;\r\n          &lt;ArrivalTime&gt;06:42 PM&lt;/ArrivalTime&gt;\r\n          &lt;DepartureCity&gt;Frankfurt&lt;/DepartureCity&gt;\r\n          &lt;DepartureTime&gt;03:12 PM&lt;/DepartureTime&gt;\r\n          &lt;FlightNumber&gt;13546&lt;/FlightNumber&gt;\r\n          &lt;Price&gt;165.6&lt;/Price&gt;\r\n        &lt;/Flight&gt;\r\n      &lt;/GetFlightsResult&gt;\r\n    &lt;/GetFlightsResponse&gt;\r\n  &lt;/s:Body&gt;\r\n&lt;/s:Envelope&gt;</a></td></tr> </table></div></div>';}