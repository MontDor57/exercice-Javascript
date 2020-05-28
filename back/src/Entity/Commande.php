<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * Commande
 * @ApiResource(
 *          normalizationContext={"groups"={"read:commande"}}
 * )
 * @ApiFilter(OrderFilter::class, properties={"datecde"="desc"})
 * @ApiFilter(SearchFilter::class,
 *      properties={"idclient": "exact"},
 * )
 * @ORM\Table(name="commande", indexes={@ORM\Index(name="commande_ibfk_2", columns={"num_commercial"}), @ORM\Index(name="idClient", columns={"idClient"})})
 * @ORM\Entity
 */
class Commande
{
    /**
     * @var int
     *
     * @ORM\Column(name="numCde", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @Groups({"read:commande"})
     */
    private $numcde;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateCde", type="date", nullable=false)
     * @Groups({"read:commande"})
     */
    private $datecde;

    /**
     * @var \Client
     *
     * @ORM\ManyToOne(targetEntity="Client")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idClient", referencedColumnName="id")
     * })
     * @Groups({"read:commande"})
     */
    private $idclient;

    /**
     * @var \Commercial
     *
     * @ORM\ManyToOne(targetEntity="Commercial")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="num_commercial", referencedColumnName="num_com")
     * })
     */
    private $numCommercial;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Article", inversedBy="numcde")
     * @ORM\JoinTable(name="contenir",
     *   joinColumns={
     *     @ORM\JoinColumn(name="numCde", referencedColumnName="numCde")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="refArt", referencedColumnName="refArt")
     *   }
     * )
     * @Groups({"read:commande"})
     */
    private $refart;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->refart = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getNumcde(): ?int
    {
        return $this->numcde;
    }

    public function getDatecde(): ?\DateTimeInterface
    {
        return $this->datecde;
    }

    public function setDatecde(\DateTimeInterface $datecde): self
    {
        $this->datecde = $datecde;

        return $this;
    }

    public function getIdclient()
    {
        return $this->idclient;
    }

    public function setIdclient(?Client $idclient): self
    {
        $this->idclient = $idclient;

        return $this;
    }

    public function getNumCommercial()
    {
        return $this->numCommercial;
    }

    public function setNumCommercial(?Commercial $numCommercial): self
    {
        $this->numCommercial = $numCommercial;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getRefart(): Collection
    {
        return $this->refart;
    }

    public function addRefart(Article $refart): self
    {
        if (!$this->refart->contains($refart)) {
            $this->refart[] = $refart;
        }

        return $this;
    }

    public function removeRefart(Article $refart): self
    {
        if ($this->refart->contains($refart)) {
            $this->refart->removeElement($refart);
        }

        return $this;
    }

}
