var data = {
	exportPolicyChanges: [
	{
	target: "vserver0:/vol/volume1/qtree3",
	rollbackdates: ["17.10.2016","18.10.2016","19.10.2016","20.10.2016"],
	changes: [
		{
		ruleindex: 1,
	date: "18.10.2016",
	changetype: "new",
	fields: {
 		clientmatch: ["server1.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["any"],
		rorule: ["none"],
		superuser: ["any"],
 		anon: [65534],			
		protocol: ["nfs"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 2,
	date: "17.10.2016",
	changetype: "unchanged",
	fields: {
 		clientmatch: ["server5.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["any"],
		rorule: ["none"],
		superuser: ["none"],
 		anon: [65534],			
		protocol: ["all"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 3,
	date: "18.10.2016",
	changetype: "removed",
	fields: {
 		clientmatch: ["server2.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["none"],
		rorule: ["any"],
		superuser: ["any"],
 		anon: [65534],			
		protocol: ["nfs"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 4,
	date: "19.10.2016",
	changetype: "changed",
	fields: {
 		clientmatch: ["server2.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["none","any"],
		rorule: ["any","none"],
		superuser: ["none","any"],
 		anon: [65534],			
		protocol: ["nfs","all"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 5,
	date: "21.10.2016",
	changetype: "new",
	fields: {
 		clientmatch: ["server9.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["any"],
		rorule: ["none"],
		superuser: ["any"],
 		anon: [65534],			
		protocol: ["all"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		}
	]
	 },
	 {
	target: "vserver0:/vol/volume1/qtree5",
	rollbackdates: ["17.10.2016","18.10.2016","19.10.2016","20.10.2016"],
	changes: [
		{
		ruleindex: 1,
	date: "18.10.2016",
	changetype: "new",
	fields: {
 		clientmatch: ["server1.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["any"],
		rorule: ["none"],
		superuser: ["any"],
 		anon: [65534],			
		protocol: ["nfs"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 2,
	date: "17.10.2016",
	changetype: "unchanged",
	fields: {
 		clientmatch: ["server5.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["any"],
		rorule: ["none"],
		superuser: ["none"],
 		anon: [65534],			
		protocol: ["all"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 3,
	date: "18.10.2016",
	changetype: "removed",
	fields: {
 		clientmatch: ["server2.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["none"],
		rorule: ["any"],
		superuser: ["any"],
 		anon: [65534],			
		protocol: ["nfs"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 4,
	date: "19.10.2016",
	changetype: "changed",
	fields: {
 		clientmatch: ["server2.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["none","any"],
		rorule: ["any","none"],
		superuser: ["none","any"],
 		anon: [65534],			
		protocol: ["nfs","all"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		},
		{
		ruleindex: 5,
	date: "21.10.2016",
	changetype: "new",
	fields: {
 		clientmatch: ["server9.de"],				// Name oder IP oder IP-range oder netgroup
		rwrule: ["any"],
		rorule: ["none"],
		superuser: ["any"],
 		anon: [65534],			
		protocol: ["all"],
 		allow_suid: ["true"],
 		allow_dev: ["true"]
	}
		}
	]
	 }
	],
	quotaChanges: [
	{
		target: "vserver0:/vol/volume3",
		rollbackdates: ["17.10.2016","18.10.2016","19.10.2016","20.10.2016"],
		changes: [
		{
		quotapath: "vserver0:/vol/volume3/qtree17",
		date: "18.10.2016",
		changetype: "new",
		fields: {
		disklimit: [ "100 MB" ],
		filelimit: [ "-" ],
		type: ["tree"]
		}
			},
		{
		quotapath: "vserver0:/vol/volume3/qtree18",
		date: "18.10.2016",
		changetype: "removed",
		fields: {
		disklimit: [ "200 MB" ],
		filelimit: [ "-" ],
		type: ["tree"]
		}
			},
		{
		quotapath: "vserver0:/vol/volume3/qtree19",
		date: "18.10.2016",
		changetype: "new",
		fields: {
		disklimit: [ "50 MB" ],
		filelimit: [ "-" ],
		type: ["tree"]
		}
			},
		{
		quotapath: "vserver0:/vol/volume3/qtree20",
		date: "20.10.2016",
		changetype: "changed",
		fields: {
		disklimit: [ "100 MB","200 MB" ],
		filelimit: [ "-" ],
		type: ["tree"]
		}
			},
		{
		quotapath: "vserver0:/vol/volume3/qtree21",
		date: "20.10.2016",
		changetype: "changed",
		fields: {
		disklimit: [ "100 MB","300 MB" ],
		filelimit: [ "-" ],
		type: ["tree"]
		}
			},
		{
		quotapath: "vserver0:/vol/volume3/qtree22",
		date: "17.10.2016",
		changetype: "unchanged",
		fields: {
		disklimit: [ "300 MB" ],
		filelimit: [ "-" ],
		type: ["tree"]
		}
			}
		]
	}
	]
};

var ractive = new Ractive({
	el: 'container',
	template: '#template',
	data: data
});

accordion();

function accordion(){
	document.addEventListener("click", function(ev) {
		function getHeader(target) {
			return target === null ? null :
				target.classList.contains('accordion-title') ? target :
				getHeader(target.parentElement);
		}
		var header = getHeader(ev.target);
		if (header === null) return;
		Array.prototype.forEach.call(document.querySelectorAll('.accordion-item'), function(item) {
		//Array.prototype.slice.apply(document.querySelectorAll('.item')).forEach(function(item) {
			if (item === header.parentElement && !item.classList.contains('open')) {
				item.classList.add('open');
				header.scrollIntoView({ block: "start", behavior: "smooth" });
			} else if (item === header.parentElement && item.classList.contains('open')) {
				item.classList.remove('open');
			}
		});
		ev.preventDefault();
	}, false);
}
