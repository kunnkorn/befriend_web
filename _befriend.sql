-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 25, 2022 at 12:19 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aumaim1`
--

-- --------------------------------------------------------

--
-- Table structure for table `auction`
--

CREATE TABLE `auction` (
  `auction_id` int NOT NULL,
  `auction_name` varchar(100) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `auction_descript` varchar(200) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `auction_size` varchar(45) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `auction_weight` float DEFAULT NULL,
  `auction_status` tinyint DEFAULT NULL COMMENT '1 = กำลังดำเนินการ\r\n2 = อนุมัติ\r\n3 = ไม่อนุมัติ\r\n4 = ประมูลเสร็จสิ้น',
  `auction_startprice` smallint DEFAULT NULL,
  `auction_endprice` smallint DEFAULT NULL,
  `auction_startdate` date DEFAULT NULL,
  `auction_enddate` date DEFAULT NULL,
  `auction_winner` int DEFAULT NULL,
  `auction_payment` tinyint DEFAULT NULL COMMENT '1 = ยังไม่จ่ายเงิน\r\n2 = จ่ายเงินเรียบร้อยแล้ว',
  `auction_transprot` tinyint DEFAULT NULL COMMENT '1 = กำลังเตรียมการขนส่ง\r\n2 = ขนส่งเรียบร้อยแล้ว\r\n3 = ได้รับสินค้าเรียบร้อยแล้ว\r\n',
  `auction_owneruserID` int DEFAULT NULL,
  `auction_donateID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `auction`
--

INSERT INTO `auction` (`auction_id`, `auction_name`, `auction_descript`, `auction_size`, `auction_weight`, `auction_status`, `auction_startprice`, `auction_endprice`, `auction_startdate`, `auction_enddate`, `auction_winner`, `auction_payment`, `auction_transprot`, `auction_owneruserID`, `auction_donateID`) VALUES
(3, 'เมื่อจิตวิทยาทําให้คนรักกัน', 'หนังสือเมื่อจิตวิทยาทําให้คนรักกัน', '30 * 40', 0.5, 2, 0, 0, '2022-07-25', '2022-07-26', 26, 1, 1, 2, 204),
(4, 'ช่างหัวคุณสิครับ', 'หนังสือช่างหัวคุณสิครับ', '30 * 40', 0.5, 2, 0, 0, '2022-07-25', '2022-07-28', 2, 1, 1, 2, 202),
(5, 'ชุดเครื่องนอน', 'ชุดเครื่องนอน Minimal', '30 * 40', 1.5, 2, 0, 0, '2022-07-25', '2022-07-29', 26, 1, 1, 2, 204),
(6, 'กระเป๋าเดินทาง', 'กระเป๋าเดินทางล้อเลื่อน', '30 * 40', 1.5, 2, 0, 0, '2022-07-25', '2022-07-27', 2, 1, 1, 2, 202);

-- --------------------------------------------------------

--
-- Table structure for table `bidder`
--

CREATE TABLE `bidder` (
  `bidder_id` int NOT NULL,
  `bidder_price` smallint DEFAULT NULL,
  `bidder_time` datetime DEFAULT NULL,
  `bidder_userid` int DEFAULT NULL,
  `bidder_auctionid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `bidder`
--

INSERT INTO `bidder` (`bidder_id`, `bidder_price`, `bidder_time`, `bidder_userid`, `bidder_auctionid`) VALUES
(163, 0, NULL, 26, 3),
(164, 0, NULL, 26, 4),
(165, 0, NULL, 26, 5),
(166, 0, NULL, 26, 6);

-- --------------------------------------------------------

--
-- Table structure for table `charge_donate`
--

CREATE TABLE `charge_donate` (
  `charge_id` int NOT NULL,
  `charge_name` varchar(1500) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `charge_amount` varchar(150) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `charge_money` int DEFAULT NULL,
  `charge_donateid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `charge_donate`
--

INSERT INTO `charge_donate` (`charge_id`, `charge_name`, `charge_amount`, `charge_money`, `charge_donateid`) VALUES
(71, 'ค่ารักษาช่วยเหลือผู้ป่วยมมะเร็งโลหิตวิทยาที่ขาดทุนทรัพย์ 5,000 บาทต่อเดือน เป็นเวลา 12 เดือน', '10', 600000, 201),
(72, 'ทุนการศึกษา และค่าอาหารกลางวันเลี้ยงเด้กพิการซ้ำซ้อนทางสายตา (โรงเรียนเด็กตาบอดพิการซ้ำซ้อน) บริจาค จำนวนประมาณ 30 คน ระยะเวลา 12 เดือน เฉลี่ยเดือนละ 278 บาท ต่อคนต่อเดือน	', 'เหมา', 100000, 202),
(73, 'ทุนการศึกษา และค่าอาหารกลางวันเลี้ยงเด้กพิการทางสายตา(โรงเรียนสอนเด็กตาบอด เพชรบุรี) บริจาค จำนวนประมาณ 60 คนระยะเวลา 12 เดือน เฉลี่ยเดือนละ 139 บาท ต่อคนต่อเดือน	', 'เหมา', 100000, 202),
(74, 'ค่ารถบัสเดินทางไป-กลับ ทำกิจกรรม 1 วัน โดยรถปรับอากาศ บริษัทฯที่มีประกันการเดินทางของผู้โดยสารทุกที่นั่ง พร้อม GPS ในการเดินทาง เพื่อความปลอดภัยสูงสุดของผู้สูงอายุ ในการเดินทาง (ตามนโยบายการป้องกัน โควิด -19 โดยเว้นระยะห่างในการนั่ง เบาะคู่ละ 1 ท่าน จำนวนผู้โดยสารคันละ 35 คน/ คัน)	', '2 คัน', 40000, 202),
(75, 'ค่าอาหารและเครื่องดื่มผู้เข้าร่วมกิจกรรม 3 มื้อ @160บาท 70 คน	', '70 คน', 14000, 202),
(76, 'ค่าอาหารและเครื่องดื่ม ประชุม 3 ครั้ง (เตรียมงาน,ก่อนกิจกรรม,หลังกิจกรรม) @160บาท *3 ครั้ง* 20 คน	', '20 คน', 9600, 202),
(77, 'ค่าอุปกรณ์ป้องกัน COVID @200 บาท*74 คน (ประกอบด้วยค่าบริการการตรวจโควิต-19 ด้วยวิธี ATK ผู้เดินทางทุกคนก่อนการเดินทาง 48 ชมจำนวน 74 คน +แอลกอฮอล์พ่นตัวเสื้อผ้าก่อนขึ้นรถ (Food grade) 1 แกลลอนใหญ่ +เจลแอลกอฮอลล้างมือ จำนวน 70 ชวด@20 บาท +แมสทางการแพทย์ คนละ 2 ชิ้น จำนวน 140 ชิ้น)	', '70 คน', 14000, 202),
(78, 'ค่าใช้จ่ายในการติดต่อประสานงาน', 'เหมา', 3000, 202),
(80, 'ค่าก่อสร้างงานสถาปัตยกรรม', '15 ห้องและลานวิ่ง', 673780, 203),
(81, 'เงินบริจาคสนับสนุนโครงการเพื่อเป็นค่าใช้จ่ายในการขนส่งเตียงจากผู้บริจาคไปส่งให้กับผู้ป่วยติดเตียงยากไร้ ค่าพาหนะและค่าน้ำมันในการขนส่งเตียงและอุปกรณ์ขนาดใหญ่', '40 ราย', 100000, 204),
(82, 'ค่าผลิตและจัดจำหน่าย ถ้วยอนามั', '10000 ถ้วย', 2200000, 205);

-- --------------------------------------------------------

--
-- Table structure for table `donate`
--

CREATE TABLE `donate` (
  `donate_id` int NOT NULL,
  `donate_agent` tinyint NOT NULL COMMENT '1 = บุคคลทั่วไป\r\n2 = ตัวแทนมูลนิธิ\r\n3 = ตัวแทนบริษัท',
  `donate_responperson` varchar(150) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `donate_personaddress` varchar(200) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `donate_personphone` varchar(11) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `donate_personemail` varchar(70) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `donate_personcard` varchar(250) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_bankaccount` varchar(250) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_name` varchar(150) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_descrict` varchar(5000) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_area` varchar(400) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_reason` varchar(5000) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_status` tinyint DEFAULT NULL COMMENT '1 = กำลังดำเนินการ\r\n2 = อนุมัติ\r\n3 = ไม่อนุมัติ\r\n4 = โครงการที่เสร็จสมบูรณ์\r\n5 = โครงการที่ปิดไปแล้วแต่ยอดบริจาคไม่ครบ',
  `donate_startprice` double DEFAULT NULL COMMENT 'ข้อมูลมาจาก Table charge_donate ',
  `donate_pricedurring` double DEFAULT NULL,
  `donate_incomeproject` double DEFAULT NULL COMMENT 'ข้อมูลมาจาก Table donater field donater_price โดยเอา 90% ของยอดนั้นมา',
  `donate_incomecompany` double DEFAULT NULL COMMENT 'ข้อมูลมาจาก Table donater field donater_price โดยเอา 10% ของยอดนั้นมา',
  `donate_startdate` date DEFAULT NULL,
  `donate_enddate` date DEFAULT NULL,
  `donate_payment_status` tinyint NOT NULL COMMENT '1 = ยังไม่โอน\r\n2 = โอนแล้ว',
  `donate_percen` tinyint NOT NULL COMMENT 'เปอร์เซนของการโดเนท',
  `donate_updateprogress` varchar(1000) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_activityprogress` varchar(1000) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_reasonunapprove` varchar(250) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `donate_owner` int DEFAULT NULL,
  `donate_types` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `donate`
--

INSERT INTO `donate` (`donate_id`, `donate_agent`, `donate_responperson`, `donate_personaddress`, `donate_personphone`, `donate_personemail`, `donate_personcard`, `donate_bankaccount`, `donate_name`, `donate_descrict`, `donate_area`, `donate_reason`, `donate_status`, `donate_startprice`, `donate_pricedurring`, `donate_incomeproject`, `donate_incomecompany`, `donate_startdate`, `donate_enddate`, `donate_payment_status`, `donate_percen`, `donate_updateprogress`, `donate_activityprogress`, `donate_reasonunapprove`, `donate_owner`, `donate_types`) VALUES
(201, 1, 'มูลนิธิมะเร็งโลหิตวิทยาแห่งประเทศไทย', 'มูลนิธิมะเร็งโลหิตแห่งประเทศไทย', '-', '-', '1658684421484_image_picker645363196.png', '1658684421487_image_picker1655720719.png', 'Five to Alive กองระดมทุนช่วยเหลือผู้ป่วยมะเร็ง', 'จากการทำแบบสำรวจพบว่าปัญหาที่เกิดขึ้นกับผู้ป่วยมะเร็งโลหิตวิทยาในัจจุบัน คือ ค่าใช้จ่ายรักษามะเร็งโลหิตวิทยาแต่ละครั้งมีราคาค่อยข้างสูง เนื่องจากต้องใช้ยาเคมีบำบัดที่ต้องผ่านกระแสโลหิต อยู่ในห้องปลอดเชื้อ และต้องมีบุคลากรทางการแพทย์ที่เชี่ยวชาญ โดยเฉพาะผู้ป่วยที่ต้องรักษาด้วยวิธีการปลูกถ่ายเซลล์ต้นกำเนิดเม็ดเลือด มีค่าใช้จ่ายประมาณ 750,000 - 1,300,000 บาท ดังนั้นมูลนิธิมะเร็งโลหิตวิทยาแห่งประเทศไทย จึงได้จัดตั้ง กองระดมทุน Fight to Alive ขึ้นมาเพื่อระดมทุนช่วยเหลือผู้ป่วย เพื่อให้ได้รับการรักษาอย่างต่อเนื่อง รวมถึงผลิตสื่อเพื่อประชาัมพันธ์และรณรงค์การบริจาคโลหิต เกล็ดเลือด และสเต็มเซลล์ จัดกิจกรรมส่งเสริมกำลังใจ ให้กับผู้ป่วยมะเร็งโลหิตวิทยา', 'ทั่วประเทศไทย', 'ในปัจจุบันมีปัญหาที่เกิดขึ้นกับผู้ป่วยมะเร็งโลหิตวิทยาในปัจจุบันคือ ค่าใช้จ่ายในการรักษามะเร็งโลหิตวิทยามีค่าใช้จ่ายที่สูง เนื่องจากยาเคมีบำบัดที่ต้องผ่านกระแสโลหิต ทำให้สิทธิการรักษาบางกรณีไม่ครอบคลุมทั้งหมดกระบวนรักษา โดยวิธีการแก้ไขคือการจัดตั้ง Fight to Alive กองทุนที่ช่วยเหลือผู้ป่วยมะเร็งโลหิตวิทยา เพื่อช่วยสมทบค่าใช้จ่ายในการรักษาสำหรับผู้ป่วยที่ขาดแคลนทุนทรัพย์ ในด้านการรักษา ค่าเดินทาง ค่าใช้จ่ายระหว่างรักษา อาทิค่านม แพมเพิส รวมถคงสนับสนุนส่งเสริมกิจกรรมของผู้ป่วยเพื่อให้มีรายได้จุนเจือระหว่างการรักษาโรคมะเร็ง', 2, 660000, 330070, 600000, 60000, '2022-07-24', '2022-07-26', 1, 0, NULL, NULL, NULL, 2, 2),
(202, 2, 'ชมรมผู้สูงอายุเต้าเต๋อซิ่นซี ศูนย์กีฬาบางขุนเทียน', 'ชมรมผู้สูงอายุเต้าเต๋อซิ่นซี ศูนย์กีฬาบางขุนเทียน (องค์กรสาธารณประโยชน์)', '-', '-', '1658685627842_image_picker645363196.png', '1658685627845_image_picker1655720719.png', 'แบ่งปันความสุข แด่เด็กพิการทางสายตา', 'สืบเนื่องจาก ภาวะโรคระบาด Covid 19 ที่ผ่านมาผู้สูงอายุขาดการติดต่อกับสังคม จึงเกิดภาวะซึมเศร้าและมองตนว่าไม่มีคุณค่าต่อสังคม ทางชมรมจึงได้จัดกิจกรรมเพื่อให้ผู้สูงอายุได้มีส่วนร่วมทางสังคม และรู้จักการแบ่งปันต่อผูด้อยโอกาส จึงเกิดเป็นกิจกรรมผู้สูงอายุไปร่วมทำกิจกรรม นำเงินไปบริจาคค่าอาหารและทุนการศึกษา มอบแด่น้องๆ รวมถึงกาารมีส่วนร่วมนำข้าวสารอาหารแห้ง ที่ตนมีมาเป็นส่วนหนึ่งในการบริจาคด้วย ซึ่งในปัจจุบันทางโรงเรียนมีค่าใช้จ่ายไม่สัมพันธ์กับรายรับ แม้จะได้เงินสนับสนุนจากภาครัฐบางส่วน ก็ทำให้ประสบปัญหาด้านการดำเนินการและสาธารณสุข สุขอนามัยของน้องๆมาก จึงขอให้ผู้มีเมตตาเป็สะพานบุญรวมระดมทุนบริจาคครั้งนี้', 'มูลนิธิธรริกชน เพื่อคนตาบอดในประเทศไทย ในพระราชูปถัมภ์ สาขาจังหวัดเพชรบุรีและ โรงเรียนการศึกษาเด็กตาบอดพิการซ้ำซ้อน ชะอำ', 'โครงการนี้มีเป้าหมายเพื่อต้องการให้ผู้สูงอายุ และประชาชนทั่วไปรู้จักการแบ่งปันคืนสู่สังคมกับผู้ด้อยโอกาสกว่าเมื่อสังคมน่าอยู่ชีวิตของเราก็มีความสุขด้วย', 2, 330220, 323630, 300200, 30020, '2022-07-24', '2022-08-03', 1, 0, NULL, NULL, NULL, 2, 2),
(203, 2, 'นางสาวศิรพันธ์ งานพร้อมวงษ์', 'มูลนิธิบ้านหมายิ้ม', '-', '-', '1658690110455_image_picker940004085.jpg', '1658690110457_image_picker686963948.jpg', 'สร้างศูนย์เรียนรู้และดูแลสุนัขบ้านหายิ้ม', 'ยังมีอีกหลายชีวิตที่รอความช่วยเหลือ โครงการสร้างศูนย์เรียนรู้และดูแลสุนัขบ้านหมายิ้มจะเป็นบ้านถาวรให้แก่ชีวิตที่ด้อนโอกาสกว่า 500 ชีวิต และจะเป็นสถานที่ที่ทำให้สัตว์มีสวัสดิภาพชีวิตที่ดีขึ้น', 'จังหวัดสงขลา', 'ทางมูลนิธิมีความจำเป็นต้องย้ายออกจากสถานที่ปัจจุบันภายในเดือนมิถุนายร 2565 นี้ เนื่องจากสถานที่ปัจจุบันเป็นที่ของเทศบาลนครหาดใหญ่ ซึ่งทางเทศบาลนครหาดใหญ่่จะนำสถานที่ไปใช้ประโยชน์ด้านอื่น มูลนิธิจึงต้องเร่งก่อสร้างเพื่อให้ทันตามกำหนดเวลา ทางมูลนิธิได้ทำการจัดซื้อที่ดิน และทำการประชาคมหมู่บ้านผ่านเรียบร้อย ตอนนี้อยู่ในขั้นตอนก่อสร้างเสร็จเรียบร้อยจะทำให้ทุกชีวิตมีบ้านที่ถาวร และเป็นสถานที่ต้นแบบของการดูแลสัตว์อย่างมีสวัสดิภาพ', 2, 741158, 555868, 673780, 67378, '2022-07-24', '2022-07-30', 1, 0, NULL, NULL, NULL, 2, 2),
(204, 2, 'มูลนิธิช่วยการสาธารณสุขชุมชน ', 'มูลนิธิช่วยการสาธารณสุขชุมชน', '-', '-', '1658691150473_image_picker1834314396.jpg', '1658691150474_image_picker1889554752.jpg', 'เชื่อมสุข ส่งเตียงให้ผู้ป่วยติดเตียงยากไร้', 'ร่วมสนับสนุนค่าขนส่งเตียงและอุปกรณ์ช่วยเหลือที่จำเป็น จากผู้บริจาคส่งมอบให้กับผู้ป่วยติดเตียงยากไร้ที่กำลังต้องการ จำนวน 40 เตียง ในเขตชุมชนกรุงเทพและปริมณฑล', 'กรุงเทพและปริมณฑล', 'ทราบหรือไม่ว่าปัจจุบันมีผู้ป่วยติดเตียงยากไร้ ซึ่งขาดเตียงผู้ป่วยและอุปกรณ์ช่วยเหลือที่จำเป็น ยังมีออีกปัญหาที่ไม่มีใครพูดถึง คือ เมื่อได้เตียงบริจาคแล้วไม่รู้จะไปรับและขนเตียงได้อย่างไร ปัจจุบันมีผู้ป่วยติดเตียงแลัผู้สูงอายุยากไร้จำนวนมาก ในเขตกรุงเทพและปริมณฑลที่ยังขาดแคลนเตียงผู้ป่วย ในขณะเดียวกันก็ยังมีผู้ที่ต้องการบริจาคส่งต่อเตียงผู้ป่วย รถเข็น และอุปกรณ์ช่วยเหลือที่ไม่ได้ใช้ประโยชน์แล้วให้ผู้ที่กำลังต้องการ', 2, 110000, 82500, 100000, 10000, '2022-07-24', '2022-07-30', 1, 0, NULL, NULL, NULL, 2, 2),
(205, 1, 'สานฝัน จิตต์มิตรภาพ', '-', '-', '-', '1658691823071_image_picker99878820.jpg', '1658691823076_image_picker2040077223.jpg', 'มอบ \"ถ้วยอนามัย\" เพื่อแก้ปัญหาการขาดแคลนผ้าอนามัย', 'สนับสนุนการผลิตและส่งมอบถ้วยอนามัยให้กับ ยังฝัน Social Enterprise สัญชสติไทยที่อยากแก้ไขปัญหาการขาดแคลนผ้าอนามัยและปัญหาขยะในไทยไปพร้อมกัน', 'ทั่วประเทศ', 'หญิงไทยเริ่มมีประจำเดือนเฉลี่ยตอนอายุ 12 - 13 ปี แต่ทุกวันนี้จากประชากรผู้หญิงอายุมากกว่า 15 ปีที่อยู่ในวัยมีประจำเดือนทั้งหมด 17 ล้านคนทำให้มีขยะมากขึ้นในประเทศอันเนื่องมาจากการใช้ผ้าอนามัย', 2, 2420000, 1815000, 2200000, 220000, '2022-07-24', '2022-07-30', 1, 0, NULL, NULL, NULL, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `donater`
--

CREATE TABLE `donater` (
  `donater_id` int NOT NULL,
  `donater_price` smallint DEFAULT NULL,
  `donater_when` datetime DEFAULT NULL,
  `donater_userdonateid` int DEFAULT NULL,
  `donater_donateid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `donater`
--

INSERT INTO `donater` (`donater_id`, `donater_price`, `donater_when`, `donater_userdonateid`, `donater_donateid`) VALUES
(32, 50, NULL, 2, 201),
(33, 20, NULL, 2, 201),
(34, 50, NULL, 2, 201),
(35, 15, '2022-07-25 11:56:29', 2, 202);

-- --------------------------------------------------------

--
-- Table structure for table `donate_type`
--

CREATE TABLE `donate_type` (
  `type_id` int NOT NULL,
  `type_name` varchar(30) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `donate_type`
--

INSERT INTO `donate_type` (`type_id`, `type_name`) VALUES
(1, 'โควิต - 19'),
(2, 'ผู้สูงอายุ'),
(3, 'เยาวชน'),
(4, 'ผู้ป่วย'),
(5, 'สิ่งแวดล้อม'),
(6, 'ภัยพิบัติ'),
(7, 'อื่นๆ');

-- --------------------------------------------------------

--
-- Table structure for table `picauction`
--

CREATE TABLE `picauction` (
  `picauction_id` int NOT NULL,
  `picaution_name` varchar(300) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `picauction_auctionid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `picauction`
--

INSERT INTO `picauction` (`picauction_id`, `picaution_name`, `picauction_auctionid`) VALUES
(1, 'auction1_1.jpg', 3),
(2, 'auction1_2.jpg', 3),
(3, 'auction2_1.jpeg', 4),
(4, 'auction2_2.jpg', 4),
(5, 'auction2_3.png', 4),
(6, 'auction3_3.jpg', 5),
(7, 'auction4_1.jpg', 6),
(8, 'auction4_2.jpg', 6),
(9, 'auction4_3.jpg', 6);

-- --------------------------------------------------------

--
-- Table structure for table `picdonate`
--

CREATE TABLE `picdonate` (
  `picdonate_id` int NOT NULL,
  `picdonate_name` varchar(300) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `picdonate_donateid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `picdonate`
--

INSERT INTO `picdonate` (`picdonate_id`, `picdonate_name`, `picdonate_donateid`) VALUES
(345, 'Project1_1.jpg', 201),
(346, 'Project1_2.jpg', 201),
(347, 'Project1_3.jpg', 201),
(348, 'Project1_4.jpg', 201),
(349, 'Project2_1.jpg', 202),
(350, 'Project2_2.jpg', 202),
(351, 'Project2_3.jpg', 202),
(352, 'Project2_4.jpg', 202),
(354, 'Project3_1.png', 203),
(355, 'Project3_2.jpg', 203),
(356, 'Project3_3.jpeg', 203),
(357, 'Project3_4.jpg', 203),
(359, 'Project4_1.jpg', 204),
(360, 'Project4_2.jpg', 204),
(361, 'Project4_3.jpg', 204),
(362, 'Project4_4.jpg', 204),
(364, 'Project5_1.png', 205),
(365, 'Project5_2.png', 205),
(366, 'Project5_3.png', 205),
(367, 'Project5_4.png', 205);

-- --------------------------------------------------------

--
-- Table structure for table `progresspic`
--

CREATE TABLE `progresspic` (
  `progresspic_id` int NOT NULL,
  `progresspic_name` varchar(300) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `progresspic_donateid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` int NOT NULL,
  `users_username` varchar(45) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_password` varchar(60) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_name` varchar(60) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_email` varchar(70) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_phonenumber` varchar(11) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_province` varchar(50) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_district` varchar(50) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_address` varchar(300) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_postcode` varchar(6) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL,
  `users_role` tinyint DEFAULT NULL COMMENT '1 = Admin\r\n2 = Users',
  `users_money` mediumint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `users_username`, `users_password`, `users_name`, `users_email`, `users_phonenumber`, `users_province`, `users_district`, `users_address`, `users_postcode`, `users_role`, `users_money`) VALUES
(2, 'korn', '$2b$10$.BeyVy9qaM8QmGepTbNGbuyTTuw53odpFaVJKns7byxLOjK6Q0VXG', 'ปีติกร', 'kokokok', '7747474', '411t', '1414r', 'fgfg', '57100', 2, 935),
(17, 'admin1', '$2b$10$xc9XdFnfNAZ5U7RcCPteQeVM/Gcn8rnIBFXy.BXVwlOpgb1g5GaiC', 'Admin1', 'admin1@gmail.com', '0987654321', NULL, NULL, NULL, NULL, 1, NULL),
(18, 'korn3', '$2b$10$ZF8P6hVh2ITRZMNwX9tXP.mKWdgJAq2CuUPcwat2fgLO/kRGRCtGq', 'korn3', 'korn3@gmail.com', '0989898909', NULL, NULL, NULL, NULL, 2, NULL),
(19, 'user123', '$2b$10$iwR1K1zTOZhWmnZkTZv4nOTo7mncGnjDVaJstTJ2zgTQTe1snAI.W', 'User123', 'user123@gmail.com', '0989876565', NULL, NULL, NULL, NULL, 2, NULL),
(20, 'aim', '$2b$10$GHhnFnmAXThaKZqkOjoSOeeHIdvPlNsQqUTXPBoP80B6grJN56vu.', 'thida', 'aimaim@gmail', '0258555', NULL, NULL, NULL, NULL, 2, NULL),
(21, 'admin2', '$2b$10$NWHzViRe0luQerSoLkVLGuNTor0kPv.2R1wei9/Z6oOhiMkljd4NC', 'admin2', 'admin@gmail.com', '025411112', '-', '-', '-', '541200', 1, NULL),
(22, 'aim2', '$2b$10$WFfG/ef8.DW7yx34RAvP9OIWCjZlRNlEtatOQq32aqsMUypG/QmJC', 'aim2', 'aim2@gmail.com', '0145236987', NULL, NULL, NULL, NULL, 2, NULL),
(23, 'admin3', '$2b$10$TJRFV7tRrHvwk0I0Eh2ahOPldcJche2oupIqIT8E/4oITEeZYqLOq', 'admin3', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(26, 'kunnkorn', '$2b$10$FJhs0PhjYX7XB3fBqQjFbu6IBy2l4NeSFQnh/28yVGU0sji3kVt2a', 'kunnkorn', 'kunnkorn@gmail.com', '0894745123', NULL, NULL, NULL, NULL, 2, 450),
(27, 'you1', '$2b$10$zXiS.zJgXH9AsTX2yRD8V.ESuOkyFO9.UXdXKUSmCCNKLWWqfvHsC', 'You1', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(28, 'you2', '$2b$10$iqBl3MTbQ.W0Xfo6lGNvpOQBPWzxzy/9GwPkMMFHxVqopg0XlxTee', 'You2', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(29, 'you3', '$2b$10$9vIAMXBdf.KemMYyHcJFA.Z/txdcQrvoZzGWIE0NEGpsh8S4inKXK', 'You3', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(30, 'you4', '$2b$10$RJuttVQjHKkUG9XiTo5uc.FPOxKpXHcQCH55Et2UPTBfvc/P3mZXK', 'You4', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(31, 'you5', '$2b$10$yhYu42vazpKKODwdwXKCc.sGfzb0kA/p2fF6qPJE7VI8gtCgUY3EW', 'You5', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(32, 'you6', '$2b$10$N4nYBhrTMtfx6l6/bARuROBCBOWwOt7QY5blEWuc2/rIdM/WAAjBa', 'You6', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(33, 'you7', '$2b$10$2hk9qUDzy0lVim3Ig66POuEup953OuYaq.MowV0f1pECJ6H6.E7Ty', 'You7', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(34, 'you8', '$2b$10$bCNE0VrzFiy.pX4dTJr7YuiL6vCM7iU8pmLr2HeR5Mj2y2xV1alB.', 'You8', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(35, 'you9', '$2b$10$pzi71Gfg0XYJ.RkDPNkJQeehDcY7EJCCt0PWhKUmElAZZCmO149.G', 'You9', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000),
(36, 'you10', '$2b$10$KN0oRVsMY4m8CUgTuN9ctOBbo.IjjNOWz4XZtQ5PCSxZNPtTPKsZe', 'You10', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auction`
--
ALTER TABLE `auction`
  ADD PRIMARY KEY (`auction_id`),
  ADD KEY `auction_owneruserID` (`auction_owneruserID`),
  ADD KEY `auction_donateID` (`auction_donateID`);

--
-- Indexes for table `bidder`
--
ALTER TABLE `bidder`
  ADD PRIMARY KEY (`bidder_id`),
  ADD KEY `bidder_userid` (`bidder_userid`),
  ADD KEY `bidder_auctionid` (`bidder_auctionid`);

--
-- Indexes for table `charge_donate`
--
ALTER TABLE `charge_donate`
  ADD PRIMARY KEY (`charge_id`),
  ADD KEY `charge_donateid` (`charge_donateid`);

--
-- Indexes for table `donate`
--
ALTER TABLE `donate`
  ADD PRIMARY KEY (`donate_id`),
  ADD KEY `donate_owner` (`donate_owner`),
  ADD KEY `donate_types` (`donate_types`);

--
-- Indexes for table `donater`
--
ALTER TABLE `donater`
  ADD PRIMARY KEY (`donater_id`),
  ADD KEY `donater_userdonateid` (`donater_userdonateid`),
  ADD KEY `donater_donateid` (`donater_donateid`);

--
-- Indexes for table `donate_type`
--
ALTER TABLE `donate_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `picauction`
--
ALTER TABLE `picauction`
  ADD PRIMARY KEY (`picauction_id`),
  ADD KEY `picauction_auctionid` (`picauction_auctionid`);

--
-- Indexes for table `picdonate`
--
ALTER TABLE `picdonate`
  ADD PRIMARY KEY (`picdonate_id`),
  ADD KEY `picdonate_donateid` (`picdonate_donateid`);

--
-- Indexes for table `progresspic`
--
ALTER TABLE `progresspic`
  ADD PRIMARY KEY (`progresspic_id`),
  ADD KEY `progresspic_donateid` (`progresspic_donateid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auction`
--
ALTER TABLE `auction`
  MODIFY `auction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bidder`
--
ALTER TABLE `bidder`
  MODIFY `bidder_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `charge_donate`
--
ALTER TABLE `charge_donate`
  MODIFY `charge_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `donate`
--
ALTER TABLE `donate`
  MODIFY `donate_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT for table `donater`
--
ALTER TABLE `donater`
  MODIFY `donater_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `picauction`
--
ALTER TABLE `picauction`
  MODIFY `picauction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `picdonate`
--
ALTER TABLE `picdonate`
  MODIFY `picdonate_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=368;

--
-- AUTO_INCREMENT for table `progresspic`
--
ALTER TABLE `progresspic`
  MODIFY `progresspic_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auction`
--
ALTER TABLE `auction`
  ADD CONSTRAINT `auction_ibfk_1` FOREIGN KEY (`auction_owneruserID`) REFERENCES `users` (`users_id`),
  ADD CONSTRAINT `auction_ibfk_2` FOREIGN KEY (`auction_donateID`) REFERENCES `donate` (`donate_id`);

--
-- Constraints for table `bidder`
--
ALTER TABLE `bidder`
  ADD CONSTRAINT `bidder_ibfk_1` FOREIGN KEY (`bidder_userid`) REFERENCES `users` (`users_id`),
  ADD CONSTRAINT `bidder_ibfk_2` FOREIGN KEY (`bidder_auctionid`) REFERENCES `auction` (`auction_id`);

--
-- Constraints for table `charge_donate`
--
ALTER TABLE `charge_donate`
  ADD CONSTRAINT `charge_donate_ibfk_1` FOREIGN KEY (`charge_donateid`) REFERENCES `donate` (`donate_id`);

--
-- Constraints for table `donate`
--
ALTER TABLE `donate`
  ADD CONSTRAINT `donate_ibfk_1` FOREIGN KEY (`donate_owner`) REFERENCES `users` (`users_id`),
  ADD CONSTRAINT `donate_ibfk_2` FOREIGN KEY (`donate_types`) REFERENCES `donate_type` (`type_id`);

--
-- Constraints for table `donater`
--
ALTER TABLE `donater`
  ADD CONSTRAINT `donater_ibfk_1` FOREIGN KEY (`donater_userdonateid`) REFERENCES `users` (`users_id`),
  ADD CONSTRAINT `donater_ibfk_2` FOREIGN KEY (`donater_donateid`) REFERENCES `donate` (`donate_id`);

--
-- Constraints for table `picauction`
--
ALTER TABLE `picauction`
  ADD CONSTRAINT `picauction_ibfk_1` FOREIGN KEY (`picauction_auctionid`) REFERENCES `auction` (`auction_id`);

--
-- Constraints for table `picdonate`
--
ALTER TABLE `picdonate`
  ADD CONSTRAINT `picdonate_ibfk_1` FOREIGN KEY (`picdonate_donateid`) REFERENCES `donate` (`donate_id`);

--
-- Constraints for table `progresspic`
--
ALTER TABLE `progresspic`
  ADD CONSTRAINT `progresspic_ibfk_1` FOREIGN KEY (`progresspic_donateid`) REFERENCES `donate` (`donate_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
