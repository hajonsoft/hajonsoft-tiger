select count(*) from HajImage

select top 10 nationality, PassportNumber, HajId, ImageId from HajCustomer

select  HajId, ImageId, ImageData from HajImage 

select top 10 c.nationality, c.PassportNumber, i.ImageData , i.ImageType
from HajCustomer c
inner join HajImage i 
on c.HajId = i.HajId
where i.ImageType = 'PHOTO'

select  HajId, ImageId, ImageData from HajImage 