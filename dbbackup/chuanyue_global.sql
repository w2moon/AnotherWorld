-- --------------------------------------------------------
-- Host:                         192.168.0.78
-- Server version:               5.5.31 - MySQL Community Server (GPL)
-- Server OS:                    osx10.6
-- HeidiSQL version:             7.0.0.4053
-- Date/time:                    2013-05-15 18:11:04
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping structure for table chuanyue_global.account_base
DROP TABLE IF EXISTS `account_base`;
CREATE TABLE IF NOT EXISTS `account_base` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(32) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `status` int(11) NOT NULL,
  `region` varchar(16) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `regip` varchar(16) NOT NULL,
  `session` varchar(16) NOT NULL,
  `date_create` datetime NOT NULL,
  `date_lastlogin` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.account_base: ~1 rows (approximately)
/*!40000 ALTER TABLE `account_base` DISABLE KEYS */;
INSERT INTO `account_base` (`id`, `userid`, `pwd`, `status`, `region`, `ip`, `regip`, `session`, `date_create`, `date_lastlogin`) VALUES
	(1, '001e4f9d9bc5', '001e4f9d9bc5', 0, 'region1', '192.168.0.79', '192.168.0.79', '936454', '2013-05-07 10:04:10', '2013-05-15 09:42:47');
/*!40000 ALTER TABLE `account_base` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.account_region
DROP TABLE IF EXISTS `account_region`;
CREATE TABLE IF NOT EXISTS `account_region` (
  `name` varchar(32) NOT NULL,
  `url` varchar(256) NOT NULL,
  `status` int(11) NOT NULL,
  `recommend` int(11) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.account_region: ~2 rows (approximately)
/*!40000 ALTER TABLE `account_region` DISABLE KEYS */;
INSERT INTO `account_region` (`name`, `url`, `status`, `recommend`) VALUES
	('region1', 'http://192.168.0.78:8080/anotherworld/region1/', 0, 1),
	('region2', 'http://192.168.0.78:8080/anotherworld/region2/', 1, 0);
/*!40000 ALTER TABLE `account_region` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.auth_group
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.auth_group: ~0 rows (approximately)
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.auth_group_permissions
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_5f412f9a` (`group_id`),
  KEY `auth_group_permissions_83d7f98b` (`permission_id`),
  CONSTRAINT `group_id_refs_id_f4b32aac` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `permission_id_refs_id_6ba0f519` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.auth_group_permissions: ~0 rows (approximately)
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.auth_permission
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  KEY `auth_permission_37ef4eb4` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_d043b34a` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.auth_permission: ~36 rows (approximately)
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
	(1, 'Can add log entry', 1, 'add_logentry'),
	(2, 'Can change log entry', 1, 'change_logentry'),
	(3, 'Can delete log entry', 1, 'delete_logentry'),
	(4, 'Can add permission', 2, 'add_permission'),
	(5, 'Can change permission', 2, 'change_permission'),
	(6, 'Can delete permission', 2, 'delete_permission'),
	(7, 'Can add group', 3, 'add_group'),
	(8, 'Can change group', 3, 'change_group'),
	(9, 'Can delete group', 3, 'delete_group'),
	(10, 'Can add user', 4, 'add_user'),
	(11, 'Can change user', 4, 'change_user'),
	(12, 'Can delete user', 4, 'delete_user'),
	(13, 'Can add content type', 5, 'add_contenttype'),
	(14, 'Can change content type', 5, 'change_contenttype'),
	(15, 'Can delete content type', 5, 'delete_contenttype'),
	(16, 'Can add session', 6, 'add_session'),
	(17, 'Can change session', 6, 'change_session'),
	(18, 'Can delete session', 6, 'delete_session'),
	(19, 'Can add base', 7, 'add_base'),
	(20, 'Can change base', 7, 'change_base'),
	(21, 'Can delete base', 7, 'delete_base'),
	(22, 'Can add region', 8, 'add_region'),
	(23, 'Can change region', 8, 'change_region'),
	(24, 'Can delete region', 8, 'delete_region'),
	(25, 'Can add role', 9, 'add_role'),
	(26, 'Can change role', 9, 'change_role'),
	(27, 'Can delete role', 9, 'delete_role'),
	(28, 'Can add equipment', 10, 'add_equipment'),
	(29, 'Can change equipment', 10, 'change_equipment'),
	(30, 'Can delete equipment', 10, 'delete_equipment'),
	(31, 'Can add soul', 11, 'add_soul'),
	(32, 'Can change soul', 11, 'change_soul'),
	(33, 'Can delete soul', 11, 'delete_soul'),
	(34, 'Can add traveller', 12, 'add_traveller'),
	(35, 'Can change traveller', 12, 'change_traveller'),
	(36, 'Can delete traveller', 12, 'delete_traveller');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.auth_user
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.auth_user: ~0 rows (approximately)
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.auth_user_groups
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `auth_user_groups_6340c63c` (`user_id`),
  KEY `auth_user_groups_5f412f9a` (`group_id`),
  CONSTRAINT `group_id_refs_id_274b862c` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_id_refs_id_40c41112` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.auth_user_groups: ~0 rows (approximately)
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.auth_user_user_permissions
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_6340c63c` (`user_id`),
  KEY `auth_user_user_permissions_83d7f98b` (`permission_id`),
  CONSTRAINT `permission_id_refs_id_35d9ac25` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_id_refs_id_4dc23c39` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.auth_user_user_permissions: ~0 rows (approximately)
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.django_admin_log
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_6340c63c` (`user_id`),
  KEY `django_admin_log_37ef4eb4` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_93d2d1f8` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `user_id_refs_id_c0d12874` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.django_admin_log: ~0 rows (approximately)
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.django_content_type
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_label` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.django_content_type: ~12 rows (approximately)
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` (`id`, `name`, `app_label`, `model`) VALUES
	(1, 'log entry', 'admin', 'logentry'),
	(2, 'permission', 'auth', 'permission'),
	(3, 'group', 'auth', 'group'),
	(4, 'user', 'auth', 'user'),
	(5, 'content type', 'contenttypes', 'contenttype'),
	(6, 'session', 'sessions', 'session'),
	(7, 'base', 'account', 'base'),
	(8, 'region', 'account', 'region'),
	(9, 'role', 'region1', 'role'),
	(10, 'equipment', 'region1', 'equipment'),
	(11, 'soul', 'region1', 'soul'),
	(12, 'traveller', 'region1', 'traveller');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.django_session
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_b7b81f0c` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.django_session: ~0 rows (approximately)
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.region1_equipment
DROP TABLE IF EXISTS `region1_equipment`;
CREATE TABLE IF NOT EXISTS `region1_equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` varchar(32) NOT NULL,
  `baseid` int(11) NOT NULL,
  `exp` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `region1_equipment_cb902d83` (`owner_id`),
  CONSTRAINT `owner_id_refs_userid_0d038cdd` FOREIGN KEY (`owner_id`) REFERENCES `region1_role` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.region1_equipment: ~0 rows (approximately)
/*!40000 ALTER TABLE `region1_equipment` DISABLE KEYS */;
INSERT INTO `region1_equipment` (`id`, `owner_id`, `baseid`, `exp`, `level`) VALUES
	(1, '001e4f9d9bc5', 1, 0, 1),
	(2, '001e4f9d9bc5', 2, 0, 1),
	(3, '001e4f9d9bc5', 3, 0, 1);
/*!40000 ALTER TABLE `region1_equipment` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.region1_role
DROP TABLE IF EXISTS `region1_role`;
CREATE TABLE IF NOT EXISTS `region1_role` (
  `userid` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `id` int(11) NOT NULL,
  `exp` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `copper` int(11) NOT NULL,
  `gold` int(11) NOT NULL,
  `charged` int(11) NOT NULL,
  `lastseed` int(11) NOT NULL,
  `slot1` int(11) NOT NULL,
  `slot2` int(11) NOT NULL,
  `slot3` int(11) NOT NULL,
  `slot4` int(11) NOT NULL,
  `slot5` int(11) NOT NULL,
  `extrasoulnum` int(11) NOT NULL,
  `extraequipmentnum` int(11) NOT NULL,
  `extratravellernum` int(11) NOT NULL,
  `date_lastupdate` datetime NOT NULL,
  `date_lastenter` datetime NOT NULL,
  `date_create` datetime NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.region1_role: ~0 rows (approximately)
/*!40000 ALTER TABLE `region1_role` DISABLE KEYS */;
INSERT INTO `region1_role` (`userid`, `name`, `id`, `exp`, `level`, `hp`, `copper`, `gold`, `charged`, `lastseed`, `slot1`, `slot2`, `slot3`, `slot4`, `slot5`, `extrasoulnum`, `extraequipmentnum`, `extratravellernum`, `date_lastupdate`, `date_lastenter`, `date_create`) VALUES
	('001e4f9d9bc5', 'tester', 1, 0, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2013-05-15 09:42:47', '2013-05-15 09:42:47', '2013-05-15 09:42:47');
/*!40000 ALTER TABLE `region1_role` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.region1_soul
DROP TABLE IF EXISTS `region1_soul`;
CREATE TABLE IF NOT EXISTS `region1_soul` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` varchar(32) NOT NULL,
  `baseid` int(11) NOT NULL,
  `exp` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `skillexp` int(11) NOT NULL,
  `skilllevel` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `region1_soul_cb902d83` (`owner_id`),
  CONSTRAINT `owner_id_refs_userid_fc2bf793` FOREIGN KEY (`owner_id`) REFERENCES `region1_role` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.region1_soul: ~0 rows (approximately)
/*!40000 ALTER TABLE `region1_soul` DISABLE KEYS */;
INSERT INTO `region1_soul` (`id`, `owner_id`, `baseid`, `exp`, `level`, `skillexp`, `skilllevel`) VALUES
	(1, '001e4f9d9bc5', 4, 0, 1, 0, 1),
	(2, '001e4f9d9bc5', 4, 0, 1, 0, 1),
	(3, '001e4f9d9bc5', 4, 0, 1, 0, 1),
	(4, '001e4f9d9bc5', 4, 0, 1, 0, 1),
	(5, '001e4f9d9bc5', 4, 0, 1, 0, 1);
/*!40000 ALTER TABLE `region1_soul` ENABLE KEYS */;


-- Dumping structure for table chuanyue_global.region1_traveller
DROP TABLE IF EXISTS `region1_traveller`;
CREATE TABLE IF NOT EXISTS `region1_traveller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `exp` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `view` int(11) NOT NULL,
  `skill1id` int(11) NOT NULL,
  `skill1exp` int(11) NOT NULL,
  `skill1level` int(11) NOT NULL,
  `skill2id` int(11) NOT NULL,
  `skill2exp` int(11) NOT NULL,
  `skill2level` int(11) NOT NULL,
  `nature` int(11) NOT NULL,
  `soulid` int(11) NOT NULL,
  `weaponid` int(11) NOT NULL,
  `clothid` int(11) NOT NULL,
  `trinketid` int(11) NOT NULL,
  `img` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `region1_traveller_cb902d83` (`owner_id`),
  CONSTRAINT `owner_id_refs_userid_6c31c9c8` FOREIGN KEY (`owner_id`) REFERENCES `region1_role` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table chuanyue_global.region1_traveller: ~0 rows (approximately)
/*!40000 ALTER TABLE `region1_traveller` DISABLE KEYS */;
INSERT INTO `region1_traveller` (`id`, `owner_id`, `name`, `exp`, `level`, `view`, `skill1id`, `skill1exp`, `skill1level`, `skill2id`, `skill2exp`, `skill2level`, `nature`, `soulid`, `weaponid`, `clothid`, `trinketid`, `img`) VALUES
	(1, '001e4f9d9bc5', '1', 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 2, 3, 'head.png'),
	(2, '001e4f9d9bc5', '2', 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 2, 0, 0, 0, 'head.png'),
	(3, '001e4f9d9bc5', '3', 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 'head.png'),
	(4, '001e4f9d9bc5', '4', 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 4, 0, 0, 0, 'head.png'),
	(5, '001e4f9d9bc5', '5', 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 'head.png');
/*!40000 ALTER TABLE `region1_traveller` ENABLE KEYS */;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
